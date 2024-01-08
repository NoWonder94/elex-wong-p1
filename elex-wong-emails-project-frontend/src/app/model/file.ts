/**
 * Uploaded file.
 */
export type File = {
  id: number;

  key: string;
  type: string;
  filename: string;
  original_name: string;
  storage_folder: string;
  mime_type: string;
  size: number;
}

export type allImgFile = {
  file: File[];
}

export type deleteFileResponse = {
  msg: string,
  status: boolean,
}
