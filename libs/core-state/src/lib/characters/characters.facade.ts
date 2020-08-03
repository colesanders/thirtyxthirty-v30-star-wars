import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';

import { Character } from '@thirty/api-interfaces';

import * as CharactersActions from './characters.actions';
import * as fromCharacters from './characters.reducer';
import * as CharactersSelectors from './characters.selectors';

@Injectable({
  providedIn: 'root'
})
export class CharactersFacade {
  loaded$ = this.store.pipe(select(CharactersSelectors.getCharactersLoaded));
  allCharacters$ = this.store.pipe(select(CharactersSelectors.getAllCharacters));
  selectedCharacter$ = this.store.pipe(select(CharactersSelectors.getSelectedCharacter));
  count$ = this.store.pipe(select(CharactersSelectors.getCount));

  constructor(private store: Store, private actions$: ActionsSubject) { }

  selectCharacter(selectedId: number) {
    this.dispatch(CharactersActions.selectCharacter({ selectedId }));
  }


  resetSelectedCharacter(){
    this.dispatch(CharactersActions.resetSelectedCharacter());
  }


  loadCharacters() {
    this.dispatch(CharactersActions.loadCharacters());
  }
  loadCharactesByPage(page: number){
    this.dispatch(CharactersActions.loadCharactersByPage({ page }));
  }

  loadCharacter(characterId: number) {
    this.dispatch(CharactersActions.loadCharacter({ characterId }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
