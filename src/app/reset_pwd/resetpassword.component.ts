import { Component, OnInit } from '@angular/core';
import { ResetpasswordService } from './resetpassword.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private reset: ResetpasswordService,
 private activeRoute: ActivatedRoute,
 private toastrService: ToastrService) { }
resetusertoken ;
  ngOnInit() {
    console.log("dagbbsbshab");
    this.activeRoute.params.subscribe(params => {  console.log("para.s", params); if(params['token']) {
    this.resetusertoken = params['token'];
    
    }});
    
  }

resestingtokens(password){

  // console.log('dd',password.value)
  this.reset.resettoken(this.resetusertoken,password.value).map(res => res.json()).subscribe(res =>{
// console.log(password.value)
    // console.log(res.message);
    this.toastrService.success(res.message)
  })

}
  
  
}
