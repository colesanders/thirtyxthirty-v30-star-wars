import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';

import * as fromCharacters from './characters/characters.reducer';
import * as fromGenerals from './generals/generals.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}
// ---------------------------------------
// Core State and Reducers
// ---------------------------------------
export interface AppState {
    router: fromRouter.RouterReducerState<RouterStateUrl>,
    [fromCharacters.CHARACTERS_FEATURE_KEY]: fromCharacters.CharactersState;
    [fromGenerals.GENERALS_FEATURE_KEY]: fromGenerals.GeneralsState;
}
export const reducers: ActionReducerMap<AppState> = {
    router: fromRouter.routerReducer,
    [fromCharacters.CHARACTERS_FEATURE_KEY]: fromCharacters.charactersReducer,
    [fromGenerals.GENERALS_FEATURE_KEY]: fromGenerals.generalsReducer,
};