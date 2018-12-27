import { Component, OnInit } from '@angular/core';
import { ForgotPwdService } from './forgot-pwd.service';


@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})

export class ForgotPwdComponent implements OnInit {
usercheck = {};
  constructor(private  forgotservice :ForgotPwdService) { }

  ngOnInit() {
  }
  reset(forgot){
    //  console.log(forgot.value);
    this.forgotservice.forgotpwds(forgot.value).map(res => res.json()).subscribe(res =>{

      console.log(res)
    })
  }
  
}
