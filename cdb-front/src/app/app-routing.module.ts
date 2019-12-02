import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IsSignedInService } from './service/is-signed-in.service';
import { ComputersComponent } from './computers/computers.component';
import { CompanysComponent } from './companys/companys.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'computers',
    component:ComputersComponent,
    canActivate:[ IsSignedInService ]
  },
  {
    path:'company',
    component:CompanysComponent,
    canActivate:[ IsSignedInService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
