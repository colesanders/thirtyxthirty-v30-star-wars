import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '@thirty/ui-login';
import { Router } from '@angular/router';

import { DATA_SETS } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  appInfo = {
    title: "Star Wars App",
    description: "30x30-V29"
  };

  sideBarOpen = false;

  links = [
    { path: '/login', title: 'Login' },
    { path: '/404', title: '404 Test Link'},
  ];

  constructor(
    private http: HttpClient,
    public loginService: LoginService,
    private router: Router) {}

  ngOnInit(){
    DATA_SETS.forEach((data) => {
      const link = {
        path: '/general/' + data,
        title: data.toUpperCase(),
      }
      this.links.push(link);
    });
  }
  
  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
