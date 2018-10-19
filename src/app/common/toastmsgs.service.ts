import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastmsgsService {

  constructor(
    private toastrService: ToastrService
  ) { }

  showSuccess() {
    this.toastrService.success('You Successfully joined our community!','Welcome');
  }
  showError(){
    this.toastrService.error('Content', 'Titel');
  }
  showShow(){
    this.toastrService.show('Content', 'Titel');
  }

  showInfo(){
    this.toastrService.info('Content', 'Titel');
  }

  showWarning(){
    this.toastrService.warning('Content', 'Titel');
  }

}
