import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // authenticate
      if (request.url.endsWith('/rest_auth/login') && request.method === 'POST') {
        const body = {
          user: 'Mark5',
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MjY2MjY0ODQsImV4cCI6MTU1ODE2MjQ4MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.HuBA00iVW_MGqiJxNPrWMEBlBMECnLRk5BDQ_6tq88M'
        };

        return of(new HttpResponse({status: 200, body: body}));
      }

      // authenticate
      if (request.url.endsWith('/rest_auth/facebook') && request.method === 'POST') {
        const body = {
          user: 'Mark5',
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MjY2MjY0ODQsImV4cCI6MTU1ODE2MjQ4MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.HuBA00iVW_MGqiJxNPrWMEBlBMECnLRk5BDQ_6tq88M'
        };

        return of(new HttpResponse({status: 200, body: body}));
      }

      // get users
      if (request.url.endsWith('/api/users') && request.method === 'GET') {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          return of(new HttpResponse({status: 200, body: users}));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError('Unauthorised');
        }
      }

      // get user by id
      if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
        // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find user by id in users array
          const urlParts = request.url.split('/');
          const id = Number(urlParts[urlParts.length - 1]);
          const matchedUsers = users.filter(u => {
            return u.id === id;
          });
          const user = matchedUsers.length ? matchedUsers[0] : null;

          return of(new HttpResponse({status: 200, body: user}));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError('Unauthorised');
        }
      }

      // create user
      if (request.url.endsWith('/api/users') && request.method === 'POST') {
        // get new user object from post body
        const newUser = request.body;

        // validation
        const duplicateUser = users.filter(user => {
          return user.username === newUser.username;
        }).length;
        if (duplicateUser) {
          return throwError('Username "' + newUser.username + '" is already taken');
        }

        // save new user
        newUser.id = users.length + 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // respond 200 OK
        return of(new HttpResponse({status: 200}));
      }

      // delete user
      if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
        // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find user by id in users array
          const urlParts = request.url.split('/');
          const id = Number(urlParts[urlParts.length - 1]);
          for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.id === id) {
              // delete user
              users.splice(i, 1);
              localStorage.setItem('users', JSON.stringify(users));
              break;
            }
          }

          // respond 200 OK
          return of(new HttpResponse({status: 200}));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError('Unauthorised');
        }
      }

      // pass through any requests not handled above
      return next.handle(request);

    }))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
