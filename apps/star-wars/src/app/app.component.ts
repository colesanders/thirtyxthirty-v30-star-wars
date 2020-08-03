import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '@thirty/ui-login';
import { Router } from '@angular/router';

@Component({
  selector: 'thirty-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  appInfo = {
    title: "Star Wars App",
    description: "30x30-V29"
  };

  sideBarOpen = false;

  links = [
    { path: '/characters', title: 'Characters' },
    { path: '/login', title: 'Login' },
    { path: '/404', title: '404 Test Link'},
  ];

  constructor(
    private http: HttpClient,
    public loginService: LoginService,
    private router: Router) {}
  
  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
