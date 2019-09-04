import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { ConfirmRegComponent } from './confirm-reg/confirm-reg.component';
import { AuthGuard } from './auth/auth.guard';
import { GeneralComponent } from './home/general/general.component';
import { PetsComponent } from './home/pets/pets.component';


const routes: Routes = [
  {path:'', redirectTo:'/user/login', pathMatch:'full'},
  {
    path:'user', component: UserComponent,
    children:[
      { path:'registration', component: RegistrationComponent },
      { path:'login', component: LoginComponent }
    ]
  },
  {path:'home', component:HomeComponent, canActivate:[AuthGuard],
  children:[
    { path:'general', component: GeneralComponent},
    { path:'pets', component: PetsComponent}
  ]
},
  {path:'confirmemail', component:ConfirmRegComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
