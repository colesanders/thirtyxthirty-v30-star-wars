import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { CharactersComponent } from './characters/characters.component';
import { CharactersOverviewComponent } from './characters/components/characters-overview/characters-overview.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

import { UiLoginModule } from '@thirty/ui-login';
import { LoginComponent } from '@thirty/ui-login';
import { LoginGuard } from '@thirty/ui-login';



const routes: Routes = [
  { path: 'characters', component: CharactersComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: ':id', 
        component: CharactersOverviewComponent 
      }
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: '404', component: FourOhFourComponent},
  { path: '', redirectTo: '/characters', pathMatch: 'full'},
  { path: '**', component: FourOhFourComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiLoginModule,
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
