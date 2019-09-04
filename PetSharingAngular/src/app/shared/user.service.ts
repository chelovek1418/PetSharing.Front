import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http: HttpClient) { }

  readonly BaseURI= 'https://localhost:44307/api';

  formModel=this.fb.group({
    UserName:['', Validators.required],
    Email:['', [Validators.required, Validators.email]],
    Passwords: this.fb.group({
      Password:['', [Validators.required, Validators.minLength(5)]],
      ConfirmPassword:['', Validators.required]
    }, {validator: this.comparePasswords})    
  });
  comparePasswords(fb:FormGroup)
  {
    let confirmPswrdCntrl = fb.get('ConfirmPassword');
    if(confirmPswrdCntrl.errors==null || 'passwordMismatch' in confirmPswrdCntrl.errors)
    {
      if(fb.get('Password').value!=confirmPswrdCntrl.value)
        confirmPswrdCntrl.setErrors({passwordMismatch:true});
      else  
        confirmPswrdCntrl.setErrors(null);
    }
  }

  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI+'/Account/register', body);
  }

  login(formData){
    return this.http.post(this.BaseURI+'/Account/login', formData);
  }

  confirm(params){
    console.log(this.BaseURI+'/Account/confirmemail?'+params);
    return this.http.get(this.BaseURI+'/Account/confirmemail', {params});
  }

  getUserProfile(){
    return this.http.get(this.BaseURI+'/Home');
  }
}
