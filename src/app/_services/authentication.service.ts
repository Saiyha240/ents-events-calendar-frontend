import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../_models/user';
import {AuthToken} from '../_models/auth-token';
import {JwtHelperService} from '@auth0/angular-jwt';
import {tap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtService: JwtHelperService) {
  }

  login(email: string, password: string): Observable<AuthToken> {
    return this.http.post<AuthToken>('/rest_auth/login', {email, password})
      .pipe(tap(this.setSession));
  }

  loginSocial(access_token: string, provider: string): Observable<any> {
    return this.http.post<any>(`/rest-auth/${provider}/`, {access_token})
      .pipe(tap(this.setSession));
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !this.jwtService.isTokenExpired(localStorage.getItem('token'));
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  private setSession(authResult: AuthToken): void {
    localStorage.setItem('user', authResult.user);
    localStorage.setItem('token', authResult.token);
  }
}
