import { Component, OnInit } from '@angular/core';
import { ForgotPwdService } from './forgot-pwd.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})

export class ForgotPwdComponent implements OnInit {
usercheck = {};
  constructor(private  forgotservice :ForgotPwdService, private toastrService: ToastrService,) { }

  ngOnInit() {
  }
  reset(forgot){
    //  console.log(forgot.value);
    this.forgotservice.forgotpwds(forgot.value).map(res => res.json()).subscribe(res =>{

      // console.log(res)
      this.toastrService.success(res.message)
    })
  }
  
}
