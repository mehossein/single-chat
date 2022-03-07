import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class alertService {
  constructor(private readonly toastr: ToastrService) {}

  showWarning(msg: string) {
    this.toastr.warning(msg, '', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
    });
  }

  showError(msg: string) {
    this.toastr.error(msg, '', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
    });
  }

  showSuccess(msg: string) {
    this.toastr.success(msg, '', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
    });
  }

  showInfo(msg: string) {
    this.toastr.info(msg, '', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
    });
  }

  show(msg: string) {
    this.toastr.show(msg, '', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
    });
  }
}
