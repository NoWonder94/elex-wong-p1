import { createTransport, getTestMessageUrl } from "nodemailer";
import fillPlaceholders from "string-placeholder";
import { prisma } from "../db/index";
import { environment } from "../generated/environment";
import { logger } from "../logger";
import schedule from 'node-schedule';

export type EmailContentReplacements = {
  [placeholder: string]: string; // placeholder -> real value pairs
}

/**
 * Service responsible for actually scheduling and sending emails (contrary to the "emailing"
 * service that is for higher level marketing operations).
 */
class EmailPlannerService {
  private scheduling = false;
  constructor() {
  }

  public async sendEmailNow(from: string, to: string, subject: string, html: string) {
    logger.info(`Sending email from ${from} to ${to} with subject: ${subject}`);

    // create reusable transporter object using the default SMTP transport
    let transporter = createTransport({
      host: environment.smtp.host,
      port: environment.smtp.port,
      secure: false, // true for 465, false for other ports
      tls: {
        // Do not fail on invalid certs (needed by emails.com localhost smtp for some reason)
        rejectUnauthorized: false
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from, to, subject, html
      //text: "Hello world?", // plain text body
    });

    console.log("Message sent: %s", info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  /**
   * Search the given content for placeholders providers as keys of "replacements" and replaces
   * them with key values from "replacements".
   *
   * Placeholders format in content: {{myVar}}
   */
  public fillEmailContentPlaceholders(content: string, replacements: EmailContentReplacements): string {
    return fillPlaceholders(content, replacements, {
      before: '{{',
      after: '}}'
    });
  }

  public async createProjectScheduleEmailing(emailList: string[], projectEmailingId: number) {

    emailList.forEach(async (val) => {
      await prisma.scheduledEmail.create({
        data: {
          projectEmailing: { connect: { id: projectEmailingId } },
          email: val,
        },
      });
    });
  }

  public async checkEmailSchedule() {
    //check if there is not send email
    let nextSendEmail = await prisma.scheduledEmail.findFirst({
      where: {
        sentdate: null,
        projectEmailing: {
          status: 1,
        },
      }
    });

    if (nextSendEmail) {
      //get\ projectemail id
      let id = nextSendEmail.projectEmailPId

      if (id) {

        this.scheduling = true;
        //get all schedule emailing from this project emailing
        let scheduleEmailing = await prisma.scheduledEmail.findMany({
          where: {
            sentdate: null,
            projectEmailing: {
              id: id,

            }
          }
        })

        console.log(scheduleEmailing);

        //get value of project emailing
        let projectEmailing = await prisma.projectEmailing.findFirst({
          where: {
            id: id,
          }
        });

        //assign speed
        let speed = `*/${projectEmailing.speed} * * * * *`;
        if (projectEmailing.speed == 60)
          speed = '* */1 * * * *';//per minute

        let i = 0;

        let total_sent = projectEmailing.total_sent;
        //start schedule
        const job = schedule.scheduleJob(speed, async () => {


          let tempSchedule = scheduleEmailing[i];

          //get email template
          let tempemail = await prisma.emailTemplate.findFirst({
            where: {
              id: projectEmailing.emailTemplateEid
            }
          });

          //send email
          this.sendEmailNow(
            "Emails.com <welcome@emails.com>",
            tempSchedule.email,
            projectEmailing.title,
            tempemail.html
          );

          let updateData = {};
          updateData['sentdate'] = new Date().toISOString();

          //update sentdate
          await prisma.scheduledEmail.update({
            data: updateData,
            where: {
              id: tempSchedule.id,
            },
          })
          total_sent++;
          let updateProjectEmailingData = {};
          updateProjectEmailingData['total_sent'] = total_sent;

          //update completed status
          await prisma.projectEmailing.update({
            data: updateProjectEmailingData,
            where: {
              id: id,
            },
          })

          i++;
          let tempProject = await prisma.projectEmailing.findFirst({
            where: {
              id: id,
            }
          });

          if (scheduleEmailing.length == i || tempProject.status != 1) {
            job.cancel();
            this.scheduling = false;
            if (scheduleEmailing.length == i) {
              let updateData = {};
              updateData['status'] = 3;

              //update completed status
              await prisma.projectEmailing.update({
                data: updateData,
                where: {
                  id: id,
                },
              })
            }
            setTimeout(() => { this.checkEmailSchedule(); }, 5 * 60 * 1000);
          }
        });
      }
    }

    if (!this.scheduling) {
      setTimeout(() => { this.checkEmailSchedule(); }, 5 * 60 * 1000);
    }
  }
}

export const emailPlannerService = new EmailPlannerService();