import { randomUUID } from "crypto";
import { mkdirSync } from "fs";
import sharp from "sharp";
import { mkdir, rename, unlink } from "fs/promises";
import moment from "moment";
import { join } from "path";
import { convertedError, DataOrError, dataOrErrorData, displayableError, ErrorCode, ErrorType, hasError, invalidParamError, serverError } from "../common/dataorerror";
import { prisma } from "../db/index";
import { Account, File } from "../generated/prisma/main-schema";
import { projectsService } from "../projects/service";

const uploadFolder = join(__dirname, "..", "..", 'uploads');

const authorizedMimeTypes = [
  "image/png",
  "image/jpeg"
]

class FilesService {
  constructor() {
    mkdirSync(uploadFolder, { recursive: true });
  }

  /**
   * Handles a file already received from a POST form as file to be uploaded. The file is moved to a right storage folder,
   * and a database File entry is created to refer the file in other services.
   */
  public async uploadFile(account: Account, projectId: number, name: string, tmpPath: string, mimeType: string, sizeBytes: number): Promise<DataOrError<File>> {
    // Make sure the target project belongs to the authenticated user
    let projectOrError = await projectsService.getAccountProjectById(account, projectId);
    if (hasError(projectOrError))
      return convertedError(projectOrError);

    let project = projectOrError.data;

    if (!project)
      return invalidParamError("No such project in the account");

    // For now we allow only pictures to be uploaded
    if (!authorizedMimeTypes.includes(mimeType))
      return displayableError(ErrorType.INVALID_PARAMETER, ErrorCode.FORBIDDEN_FILE_TYPE_UPLOADED, "Unsupported file type");

    let now = moment();
    let year = now.format("YYYY");
    let month = now.format("MM");
    let day = now.format("DD");

    let subFolder = `${year}/${month}/${day}`;

    let extension = this.mimeTypeToExtension(mimeType);
    let filename = `${randomUUID()}.${extension}`
    let file = await prisma.file.create({
      data: {
        filename,
        project: { connect: { id: project.id } },
        type: "picture",
        original_name: name,
        storage_folder: subFolder,
        mime_type: mimeType,
        size: sizeBytes
      }
    });

    // Move and rename file
    let destFolder = `${uploadFolder}/${file.storage_folder}`;
    await mkdir(destFolder, { recursive: true });

    let destinationPath = `${destFolder}/${filename}`;
    await rename(tmpPath, destinationPath);

    // TODO: check account quota
    // TODO: options to resize pictures

    const img = sharp(destinationPath);
    img.metadata(async (e, metadata) => {
      if (metadata.width > 800) {
        let buffer = await img.resize({ width: 800 }).toBuffer();

        sharp(buffer).toFile(destinationPath).then(data => {
          console.log(`File ${filename} adjust with width`);
        });

      } else if (metadata.height > 800) {
        let buffer = await img.resize({ height: 800 }).toBuffer();

        sharp(buffer).toFile(destinationPath).then(data => {
          console.log(`File ${filename} adjust with height`);
        });
      }
    })

    return dataOrErrorData(file);
  }

  private mimeTypeToExtension(mimeType: string): string {
    switch (mimeType) {
      case "image/jpeg": return "jpg";
      case "image/png": return "png";
      default:
        throw new Error("Unsupported mime type: " + mimeType);
    }
  }

  private getStoragePath(file: File): string {
    return `${uploadFolder}/${file.storage_folder}/${file.filename}`;
  }

  /**
   * Deletes a file.
   * The database file entry is deleted, and the file in storage as well.
   */
  public async deleteFileById(fileId: number): Promise<DataOrError<void>> {
    let file = await prisma.file.findFirst({
      where: {
        id: fileId
      }
    });

    if (!file) {
      return invalidParamError(`File with id ${fileId} doesn't exist`);
    }

    // Delete from disk
    let filePath = this.getStoragePath(file);
    await unlink(filePath);

    // Delete from database
    await prisma.file.delete({
      where: {
        id: fileId
      }
    });

    return dataOrErrorData();
  }

  /**
   * Retrieves a file by its ID but only if it belongs to the given account and project.
   */
  public async getProjectFile(account: Account, projectId: number, fileId: number): Promise<DataOrError<File>> {
    try {
      let file = await prisma.file.findFirst({
        where: {
          id: fileId,
          project: {
            accountUid: account.id
          },
          projectPid: projectId
        }
      });

      return dataOrErrorData(file);
    }
    catch (e) {
      return serverError("Get project file prisma query error");
    }
  }

  public async getAllImage(account: Account, projectId: number): Promise<DataOrError<File[]>> {
    // Make sure the target project belongs to the authenticated user
    let projectOrError = await projectsService.getAccountProjectById(account, projectId);
    if (hasError(projectOrError))
      return convertedError(projectOrError);

    let project = projectOrError.data;

    if (!project)
      return invalidParamError("No such project in the account");


    let file = await prisma.file.findMany({
      where: {
        projectPid: projectId
      }
    });
    return dataOrErrorData(file);
  }
}

export const filesService = new FilesService();