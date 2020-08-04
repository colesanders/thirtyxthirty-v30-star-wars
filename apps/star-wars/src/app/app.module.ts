import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreStateModule } from '@thirty/core-state';
import { CoreDataModule } from '@thirty/core-data';
import { MaterialModule, RatingComponent, MatChipComponent } from '@thirty/material';
import * as fromCharacters from '@thirty/core-state';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';

import { CharactersComponent } from './characters/characters.component';
import { CharactersDetailComponent } from './characters/components/characters-detail/characters-detail.component';
import { CharactersListComponent } from './characters/components/characters-list/characters-list.component';
import { CharactersOverviewComponent } from './characters/components/characters-overview/characters-overview.component';

import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { GeneralsComponent } from './generals/generals.component';
import { GeneralsListComponent } from './generals/components/generals-list/generals-list.component';
import { GeneralsDetailComponent } from './generals/components/generals-detail/generals-detail.component';
import { GeneralsOverviewComponent } from './generals/components/generals-overview/generals-overview.component';


@NgModule({
  declarations: [
    AppComponent,
    CharactersDetailComponent,
    CharactersListComponent,
    FourOhFourComponent,
    CharactersComponent,
    RatingComponent,
    MatChipComponent,
    CharactersOverviewComponent,
    GeneralsComponent,
    GeneralsListComponent,
    GeneralsDetailComponent,
    GeneralsOverviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CoreStateModule,
    CoreDataModule,
    FormsModule,
    RoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


