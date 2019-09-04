import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) =>{
        if(res.status==200){
          this.service.formModel.reset();
          this.toastr.success('New user created!\nTo confirm your registration follow link sended to your email', 'Last step))');
        }
        else{
          this.toastr.error('Something went wrong(', 'Try one more time!');
        }
      },
      err=>{
        console.log(err);
      }
    )
  }

}
