/**
 * Required External Modules and Interfaces
 */
import { Router } from "express";
import { tmpdir } from "os";
import { apiError } from "../common/api";
import { accessForbiddenError, hasError, invalidParamError } from "../common/dataorerror";
import { authMiddleware } from "../middleware/auth.middleware";

import multer from "multer";
import { File } from "../generated/prisma/main-schema/index";
import { logger } from "../logger";
import { filesService } from "./service";
const upload = multer({ dest: tmpdir() });

type UploadedFileResponse = {
	file: File;
}

type GetAllImageResponse = {
	file: File[];
}

type DeleteFileResponse = {
	msg: string;
	status: boolean;
}

export const configureFilesRoutes = (router: Router): void => {
	/**
	* Uploads a new file to the server
	*/
	router.post<any, any, UploadedFileResponse>('/files', [authMiddleware, upload.single('file')], async (req, res) => {
		if (!req.account)
			return apiError(res, accessForbiddenError("Only authenticated users can upload files"));

		if (!req.file)
			return apiError(res, invalidParamError("No file received"));

		if ((req.file.size / 1048576) > 10)
			return apiError(res, invalidParamError("File size is exceed 10mb"));

		let projectId = parseInt(req.body.projectId);

		/* Example input:
		{
			fieldname: 'file',
			originalname: 'vultr.txt',
			encoding: '7bit',
			mimetype: 'text/plain',
			destination: '/var/folders/d2/nw213ddn1c7g6_zcp5940ckw0000gn/T',
			filename: 'a16f9cc4aab36827b5e1aad1f65aa0c9',
			path: '/var/folders/d2/nw213ddn1c7g6_zcp5940ckw0000gn/T/a16f9cc4aab36827b5e1aad1f65aa0c9',
			size: 25
		}
		*/
		let fileInfo = <Express.Multer.File>req.file;

		logger.info("Upload file info:", fileInfo);



		let uploadedFileOrError = await filesService.uploadFile(req.account, projectId, fileInfo.originalname, fileInfo.path, fileInfo.mimetype, fileInfo.size);
		if (hasError(uploadedFileOrError))
			return apiError(res, uploadedFileOrError);

		res.json({
			file: uploadedFileOrError.data
		})
	});
	router.post<any, any, DeleteFileResponse>('/files/delete', authMiddleware, async (req, res) => {
		if (!req.account)
			return apiError(res, accessForbiddenError("Only authenticated users can delete files"));

		// let fileId = parseInt(req.body.fileId);
		let fileId = parseInt(req.query.fileId.toString());
		logger.info("Delete file info:", fileId);

		let deleteFileOrError = await filesService.deleteFileById(fileId);
		if (hasError(deleteFileOrError))
			return apiError(res, deleteFileOrError);

		res.json({
			msg: 'Delete file success.',
			status: true,
		})
	});

	router.get<any, any, GetAllImageResponse>('/projects/:projectId/allImages', authMiddleware, async (req, res) => {
		let projectId = parseInt(req.params.projectId);

		let getAllImageOrError = await filesService.getAllImage(req.account, projectId);
		if (hasError(getAllImageOrError))
			return apiError(res, getAllImageOrError);

		res.json({
			file: getAllImageOrError.data
		})
	});
}