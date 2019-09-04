import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-confirm-reg',
  templateUrl: './confirm-reg.component.html',
  styles: []
})
export class ConfirmRegComponent implements OnInit {

  constructor(private servie: UserService, private route: ActivatedRoute) { }

  userId: string;
  code: string;
  text: string;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.code = params['code']
    });
    const prms = new HttpParams()
      .set('userId', this.userId)
      .set('code', this.code);
      console.log(this.userId);
      console.log(this.code);
    this.servie.confirm(prms).subscribe(
      (res:any) =>{
        console.log(res);
        if(res.succeeded){
          this.text = "Your email address has been verified! Click to login!"
        }
        else{
          this.text = "Error while email confirming! Try again"
          res.errors.forEach(element=>{
            this.text+=element.description+"\n";
          })
      };
    }
    )
  }

}
