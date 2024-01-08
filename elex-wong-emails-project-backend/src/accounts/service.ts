import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import Queue from "promise-queue";
import { convertedError, DataOrError, dataOrErrorData, displayableError, ErrorCode, ErrorType, hasError, invalidParamError, serverError } from '../common/dataorerror';
import { convertedEditionValue, TypedEditionKeyEntry, UpdatedEntry } from '../common/updatedentry';
import { prisma } from '../db';
import { emailPlannerService } from "../emailplanner/service";
import { environment } from "../generated/environment";
import { Account } from '../generated/prisma/main-schema';
import { iRedmailService } from '../iredmail/service';
import { logger } from "../logger";
import { PublicAccountInfo, UpdatedAccountInfo } from './model/publicaccountinfo';

export type CreateAccountRequest = {
    address: string;
    forwardEmail: string;
    ipAddress: string;
};

class AccountService {
    private emailVerificationTemplateHtml: string;

    // Queue to prevent spammy account creation in parrallel - fully create only one account at a time
    private accountCreationQueue = new Queue(1);

    constructor() {
        this.emailVerificationTemplateHtml = readFileSync("./assets/email-templates/email-verification.html").toString("utf-8");
    }

    public getPublicAccountInfo(account: Account): PublicAccountInfo {
        return {
            address: account.address.toLowerCase(),
            forwarding_email: account.forwarding_email,
            forwarding_email_verified: account.forwarding_email_verified,
            twitter: account.twitter,
            discord: account.discord,
            is_admin: account.is_admin
        }
    }

    public getUpdatedAccountInfo(account: Account): UpdatedAccountInfo {
        return {
            forwarding_email: account.forwarding_email
        }
    }

    public getAccountByAddress(address: string): Promise<Account> {
        address = address.toLowerCase();

        return prisma.account.findFirst({
            where: { address }
        });
    }

    public getAccountByForwardingEmail(forwarding_email: string): Promise<Account> {
        return prisma.account.findFirst({
            where: { forwarding_email: forwarding_email.toLowerCase() }
        });
    }

    public getAccountById(id: number): Promise<Account> {
        return prisma.account.findFirst({
            where: { id }
        });
    }

    /**
     * Creates a new standard user account, without any reference to a campaign or project.
     */
    public async createAccount(request: CreateAccountRequest): Promise<DataOrError<Account>> {
        return this.accountCreationQueue.add(async () => {
            let accountAddress = (request.address || "").toLowerCase();

            if (request.forwardEmail.endsWith("emails.com"))
                return invalidParamError("Forward email address can not be emails.com!");

            const pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if (!pattern.test(request.forwardEmail))
                return invalidParamError("Invalid forward email address!");

            // Make sure the account doesn't exist
            let existingAccount = await prisma.account.findFirst({
                where: {
                    OR: [
                        { address: accountAddress.toLowerCase() }, // Wallet address must not be in use
                        { forwarding_email: request.forwardEmail.toLowerCase() }, // Forwarding email must not be in use
                        { creation_ip_Address: request.ipAddress } // IP address never used
                    ]
                }
            });

            if (existingAccount) {
                logger.warn("Similar account found:", existingAccount);
                return displayableError(ErrorType.INVALID_PARAMETER, ErrorCode.EXISTING_ACCOUNT, "Account already exists");
            }

            try {
                // Create a new user account
                let account = await prisma.account.create({
                    data: {
                        address: accountAddress,
                        forwarding_email: request.forwardEmail.toLowerCase(),
                        forwarding_email_verified: false,
                        creation_ip_Address: request.ipAddress
                    }
                });

                // Setup account's email
                await iRedmailService.setupAccount(account);

                return dataOrErrorData(account);
            }
            catch (e) {
                return serverError("Unhandled error while creating a new account", e);
            }
        });
    }

    /**
     * Update account fields (by owner)
     */
    public async updateAccountField(account: Account, updatedEntry: UpdatedEntry, allowUpdatingProtected = false): Promise<DataOrError<Account>> {
        try {
            const allowedEditionKeys: TypedEditionKeyEntry[] = [
                {
                    key: "forwarding_email", type: "string", initialCheck: async value => {
                        let forwardingEmail = <string>value;
                        if (forwardingEmail.endsWith("emails.com"))
                            return invalidParamError("Forward email address can not be emails.com!");

                        const pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                        if (!pattern.test(forwardingEmail))
                            return invalidParamError("Invalid forward email address!");

                        // Check whether email exists or not
                        let existingForwardingEmail = await this.getAccountByForwardingEmail(forwardingEmail);
                        if (existingForwardingEmail)
                            return displayableError(ErrorType.INVALID_PARAMETER, ErrorCode.EXISTING_EMAIL, "Email already exists");

                        // Make sure the email is really being changed (different value) and if so, mark it as unverified
                        if (account.forwarding_email != value) {
                            await prisma.account.update({
                                data: {
                                    forwarding_email_verified: false
                                },
                                where: {
                                    id: account.id
                                }
                            });
                        }

                        return dataOrErrorData();
                    }
                },
                { key: "presentation", type: "string" },
                { key: "twitter", type: "string", protected: true },
                { key: "discord", type: "string", protected: true }
            ];

            let finalValueOrError = await convertedEditionValue(allowedEditionKeys, updatedEntry, allowUpdatingProtected);
            if (hasError(finalValueOrError))
                return convertedError(finalValueOrError);

            // Update in database
            let updateData = {};
            updateData[updatedEntry.key] = finalValueOrError.data;

            let updatedAccount = await prisma.account.update({
                data: updateData,
                where: {
                    id: account.id
                }
            });

            return dataOrErrorData(updatedAccount);
        }
        catch (e) {
            return serverError("Update account prisma error", e);

        }
    }

    /**
     * Verify account by sending email verification
     */
    public async verifyEmailAddress(account: Account): Promise<DataOrError<Account>> {
        if (!account.forwarding_email)
            return invalidParamError("Invalid forward email address!");

        try {
            let result = account;

            // Generate a verification key
            let key = randomUUID();

            // Save key to database
            await prisma.account.update({
                where: { id: account.id },
                data: {
                    email_verification_challenge: key
                }
            });

            // TODO LATER: Don't use static email, use a created email template from our own editor

            // Customize the template with user data
            let templateHtml = emailPlannerService.fillEmailContentPlaceholders(this.emailVerificationTemplateHtml, {
                bannerPictureUrl: `${environment.nodeJS.rootUrl}/static/email-templates/email-verification/airdrop_2.png`,
                emailAddress: account.forwarding_email,
                verificationUrl: `${environment.frontEnd.rootUrl}/verifyemail?key=${key}`
            })

            // Send email verification
            void emailPlannerService.sendEmailNow(
                "Emails.com <verify@emails.com>",
                account.forwarding_email,
                "Verify your emails.com account",
                templateHtml);

            return dataOrErrorData(result);
        }
        catch (e) {
            return serverError("Unhandled error while sending email verification", e);
        }
    }

    /**
     * Checks a given key against the expected forward email verification key.
     */
    public async checkEmailVerificationKey(account: Account, verificationKey: string): Promise<DataOrError<boolean>> {
        try {
            if (account.email_verification_challenge === verificationKey) {
                // OK - mark forward email address as verified
                await prisma.account.update({
                    where: { id: account.id },
                    data: {
                        forwarding_email_verified: true
                    }
                });

                return dataOrErrorData(true);
            }
            else {
                return invalidParamError("The verification key is invalid");
            }
        }
        catch (e) {
            return serverError("Check email verification key error", e);
        }
    }
}

export const accountService = new AccountService();

// TODO: cleanup, move somewhere else
/* const convertChain = (chain: any) => {
    let hotFix = "";
    const c = typeof chain == 'string' ? parseInt(chain) : chain;

    if (c == 1) {
        hotFix = "eth.emails.com"
    } else if (c == 56) {
        hotFix = "bsc.emails.com"
    } else if (c == 20) {
        hotFix = "esc.emails.com"
    } else if (c == 137) {
        hotFix = "matic.emails.com"
    }

    return hotFix;
} */

