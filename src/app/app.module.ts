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
import {CalendarHeaderComponent} from './_utils/calendar-header/calendar-header.component';
import {NavbarComponent} from './layouts/home-layout/navbar/navbar.component';
import {AuthServiceConfig, FacebookLoginProvider, SocialLoginModule} from 'angular5-social-login';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('1401697366643723')
      }
    ]);
  return config;
}

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
    AngularFontAwesomeModule,
    HttpClientModule,
    SocialLoginModule,
    CalendarModule.forRoot(),
    AuthModule,
    EntsCalendarModule,
    AppRoutingModule
  ],
  providers: [
    {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
