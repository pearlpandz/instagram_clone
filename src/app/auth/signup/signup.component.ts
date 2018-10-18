import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    // this.showSuccess();
    // this.showShow();
    // this.showError();
    // this.showWarning();
    // this.showInfo();
  }

  Submit(newUser: any) {
    this.http.post('http://localhost:3000/adduser', newUser.value).subscribe(data => {
      console.log(data);
      this.showSuccess();
		});
  }

  showSuccess() {
    this.toastrService.success('Content','Title');
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
