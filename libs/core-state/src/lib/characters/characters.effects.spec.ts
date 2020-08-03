import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CharactersEffects } from './characters.effects';
import * as CharactersActions from './characters.actions';

describe('CharactersEffects', () => {
  let actions: Observable<any>;
  let effects: CharactersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CharactersEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(CharactersEffects);
  });

  describe('loadCharacters$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CharactersActions.loadCharacters() });

      const expected = hot('-a-|', {
        a: CharactersActions.loadCharactersSuccess({ characters: [] }),
      });

      expect(effects.loadCharacters$).toBeObservable(expected);
    });
  });
});
