import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from '.';

import { CharactersEffects } from './characters/characters.effects';
import { GeneralsEffects } from './generals/generals.effects';

const STORE_NAME = 'star-wars-store';
const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictActionSerializability: true,
    strictStateImmutability: true,
    strictStateSerializability: true
  }
};

@NgModule({
  imports: [
    CommonModule,
    StoreRouterConnectingModule,
    StoreDevtoolsModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([
      CharactersEffects,
      GeneralsEffects,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, name: STORE_NAME }),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
  ],
})
export class CoreStateModule {}
