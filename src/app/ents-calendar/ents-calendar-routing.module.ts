import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../auth/login/login.component';
import {LoginLayoutComponent} from '../layouts/login-layout/login-layout.component';
import {HomeLayoutComponent} from '../layouts/home-layout/home-layout.component';
import {EntsCalendarComponent} from './ents-calendar.component';

const routes: Routes = [
  {
    path: 'calendar',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: EntsCalendarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntsCalendarRoutingModule {
}
