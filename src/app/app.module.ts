import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeLayoutComponent} from './layouts/home-layout/home-layout.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {AuthComponent} from './auth/auth.component';
import {AuthModule} from './auth/auth.module';
import {CalendarModule} from 'angular-calendar';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './layouts/home-layout/navbar/navbar.component';
import {AuthServiceConfig, FacebookLoginProvider, SocialLoginModule} from 'angular5-social-login';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HomeModule} from './home/home.module';
import {ApiInterceptor} from './_helpers/api.interceptor';
import {AuthenticationService} from './_services/authentication.service';
import {JwtModule} from '@auth0/angular-jwt';
import {fakeBackendProvider} from './_helpers/fake-backend';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    AuthComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    SocialLoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200/auth/']
      }
    }),
    CalendarModule.forRoot(),
    AuthModule,
    HomeModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs},
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
