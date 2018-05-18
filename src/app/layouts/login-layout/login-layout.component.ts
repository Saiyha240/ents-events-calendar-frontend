import {Component, OnInit, Renderer2, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'my-login-page');
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'my-login-page');
  }

}
