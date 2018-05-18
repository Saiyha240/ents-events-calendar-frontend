import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginLayoutComponent} from '../layouts/login-layout/login-layout.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  // {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  {
    path: 'auth',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
