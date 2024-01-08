import {
  Injectable, NgZone
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataOrError } from '../model/dataorerror';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private toastr: ToastrService,
    private zone: NgZone
  ) { }

  public info(message: string) {
    this.zone.run(() => {
      this.toastr.success(message, null, {
        timeOut: 2000
      });
    });
  }

  public error(message: string) {
    this.zone.run(() => {
      this.toastr.error(message);
    });
  }

  public errorIfDisplayable(error: DataOrError<any>) {
    this.zone.run(() => {
      if (error && error.displayableError)
        if (typeof error.displayableError === 'object')
          this.error(error.displayableError.displayableMessage);
        else if (typeof error.displayableError === 'string')
          this.error(error.displayableError);
    });
  }

  public warning(message: string) {
    this.zone.run(() => {
      this.toastr.warning(message);
    });
  }

  public saved() {
    this.zone.run(() => {
      this.toastr.success("Saved!", null, {
        timeOut: 1000
      });
    });
  }
}
