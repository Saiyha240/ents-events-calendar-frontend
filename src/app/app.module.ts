import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeLayoutComponent} from './layouts/home-layout/home-layout.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {AuthComponent} from './auth/auth.component';
import {AuthModule} from './auth/auth.module';
import {EntsCalendarComponent} from './ents-calendar/ents-calendar.component';
import {EntsCalendarModule} from './ents-calendar/ents-calendar.module';
import {CalendarModule} from 'angular-calendar';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CalendarHeaderComponent } from './_utils/calendar-header/calendar-header.component';
import { NavbarComponent } from './layouts/home-layout/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    EntsCalendarComponent,
    AuthComponent,
    EntsCalendarComponent,
    CalendarHeaderComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CalendarModule.forRoot(),
    AuthModule,
    EntsCalendarModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
