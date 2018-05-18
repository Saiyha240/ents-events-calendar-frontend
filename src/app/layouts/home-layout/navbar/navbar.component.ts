import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {AuthenticationService} from '../../../_services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navbarCollapsed = true;
  company = environment.company;


  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
