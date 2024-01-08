import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FilePickerAdapter, FilePreviewModel, UploadResponse, UploadStatus } from 'ngx-awesome-uploader';
import { Observable, of, Subject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Socket } from "socket.io-client";
import { environment } from "src/environments/environment";
import { DataOrError, DisplayableError } from "../model/dataorerror";
import { allImgFile, deleteFileResponse, File } from "../model/file";
import { Logger } from "../utils/logger";
import { AuthTokenService } from "./authtoken.service";
import { ToastService } from "./toast.service";

class GenericPictureUploadAdapter extends FilePickerAdapter {
  constructor(private projectId: number, private http: HttpClient, private authTokenService: AuthTokenService, private toastService: ToastService) {
    super();
  }

  public uploadFile(fileItem: FilePreviewModel): Observable<UploadResponse> {
    const form = new FormData();
    form.append('projectId', `${this.projectId}`);
    form.append('file', fileItem.file);

    const api = `${environment.api.url}/files`;
    const req = new HttpRequest('POST', api, form, {
      reportProgress: true, headers: new HttpHeaders({
        token: this.authTokenService.getAuthToken()
      })
    });

    return this.http.request(req).pipe(
      map((res: HttpEvent<any>) => {
        if (res.type === HttpEventType.Response) {
          const responseFromBackend = res.body;
          return {
            body: responseFromBackend,
            status: UploadStatus.UPLOADED
          };
        } else if (res.type === HttpEventType.UploadProgress) {
          /** Compute and show the % done: */
          const uploadProgress = +Math.round((100 * res.loaded) / res.total);
          return {
            status: UploadStatus.IN_PROGRESS,
            progress: uploadProgress
          };
        }
        else {
          return {
            status: UploadStatus.ERROR
          };
        }
      }),
      catchError(er => {
        Logger.error("files", er);

        // Try to parse as displayable error
        let displayableError: DisplayableError;
        if (er.error && (typeof er.error === "object" || typeof er.error === "string"))
          displayableError = er.error;

        let status = er.status;
        let dataOrError: DataOrError<any> = {
          httpError: status,
          displayableError
        }

        console.error(dataOrError)

        // Show an error toast is this is a user friendly error
        this.toastService.errorIfDisplayable(dataOrError);

        return of({ status: UploadStatus.ERROR, body: er });
      })
    );
  }

  public removeFile(fileItem: FilePreviewModel): Observable<any> {
    /* const id = 50;
    const responseFromBackend = fileItem.uploadResponse;
    console.log(fileItem);
    const removeApi = 'https://run.mocky.io/v3/dedf88ec-7ce8-429a-829b-bd2fc55352bc';
    return this.http.post(removeApi, { id }); */
    return null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private socket: Socket;

  constructor(private http: HttpClient, private authTokenService: AuthTokenService, private toastService: ToastService) {
  }

  public createGenericPictureUploadAdapter(projectId: number): GenericPictureUploadAdapter {
    return new GenericPictureUploadAdapter(projectId, this.http, this.authTokenService, this.toastService);
  }

  public getFileDownloadPath(file: File): string {
    if (!file)
      return null;

    return `${environment.api.url}/uploads/${file.storage_folder}/${file.filename}`;
  }

  public uploadFile(projectId: number, file: File | Blob) {
    console.log("file", file)

    const form = new FormData();
    form.append('projectId', `${projectId}`);
    form.append('file', file as string | Blob);

    const api = `${environment.api.url}/files`;
    const req = new HttpRequest('POST', api, form, {
      reportProgress: true,
      headers: new HttpHeaders({
        token: this.authTokenService.getAuthToken()
      })
    });

    var result = new Subject<any>();
    this.http.request(req).subscribe(res => {
      if (res.type === HttpEventType.Response) {
        const responseFromBackend = res.body;
        result.next(responseFromBackend);
      }

    });

    return result.asObservable();

  }

  public getAllImageByProjectId(projectId: number) {

    const form = new FormData();
    form.append('projectId', `${projectId}`);

    const api = `${environment.api.url}/projects/${projectId}/allImages`;
    const req = new HttpRequest('GET', api, form, {
      reportProgress: true,
      headers: new HttpHeaders({
        token: this.authTokenService.getAuthToken()
      })
    });

    var result = new Subject<allImgFile>();
    this.http.request(req).subscribe(res => {
      if (res.type === HttpEventType.Response) {
        const responseFromBackend = res.body as allImgFile;
        result.next(responseFromBackend);
      }

    });

    return result.asObservable();
  }

  public deleteImage(fileId: number) {

    const form = new FormData();
    form.append('fileId', `${fileId}`);

    const api = `${environment.api.url}/files/delete`;
    const req = new HttpRequest('POST', api, form, {
      reportProgress: true,
      params: new HttpParams({ fromString: `fileId=${fileId}` }),
      headers: new HttpHeaders({
        token: this.authTokenService.getAuthToken()
      })
    });

    var result = new Subject<deleteFileResponse>();
    this.http.request(req).subscribe(res => {
      if (res.type === HttpEventType.Response) {
        const responseFromBackend = res.body as deleteFileResponse;
        result.next(responseFromBackend);
      }
    });

    return result.asObservable();
  }
}
