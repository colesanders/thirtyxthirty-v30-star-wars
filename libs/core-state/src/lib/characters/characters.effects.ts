import { Injectable } from '@angular/core';
import { CharactersService } from '@thirty/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap, exhaust, exhaustMap, catchError } from 'rxjs/operators';
import * as CharactersActions from './characters.actions';
import { Character, ApiObj } from '@thirty/api-interfaces';
import { merge, of } from 'rxjs';

@Injectable()
export class CharactersEffects {
  @Effect() loadCharacters$ = this.actions$.pipe(
    ofType(CharactersActions.loadCharacters),
    fetch({
      run: (action) => this.charactersService.all().pipe(
        map((apiObj: ApiObj) => {
          const characters: Character[] = apiObj.results;
          const count: number = apiObj.count;
          characters.map((character) => {
            const regArr = character.url.match('[0-9]+');
            character.id = +regArr[0];
          })

          return CharactersActions.loadCharactersSuccess({ characters, count })
        })
      ),
      onError: (action, error) => CharactersActions.loadCharactersFailure({ error })
    })
  );

  @Effect() loadCharactersByPage$ = this.actions$.pipe(
    ofType(CharactersActions.loadCharactersByPage),
    fetch({
      run: (action) => this.charactersService.byPage(action.page).pipe(
        map((apiObj: ApiObj) => {
          const characters: Character[] = apiObj.results;
          const count: number = apiObj.count;
          characters.map((character) => {
            const regArr = character.url.match('[0-9]+');
            character.id = +regArr[0];
          })
          return CharactersActions.loadCharactersSuccess({ characters, count })
        })
      ),
      onError: (action, error) => CharactersActions.loadCharactersFailure({ error })
    })
  );

  @Effect() loadCharacter$ = this.actions$.pipe(
    ofType(CharactersActions.loadCharacter),
    fetch({
      run: (action) => this.charactersService.byId(action.characterId).pipe(
        map((character: Character) => {
          character.id = action.characterId;
          return CharactersActions.loadCharacterSuccess({ character })
        })
      ),
      onError: (action, error) => CharactersActions.loadCharacterFailure({ error })
    })
  );

  

  constructor(
    private actions$: Actions,
    private charactersService: CharactersService
  ) {}
}