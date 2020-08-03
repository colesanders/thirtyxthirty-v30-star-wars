import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CharactersEntity } from './characters.models';
import { CharactersEffects } from './characters.effects';
import { CharactersFacade } from './characters.facade';

import * as CharactersSelectors from './characters.selectors';
import * as CharactersActions from './characters.actions';
import {
  CHARACTERS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './characters.reducer';

interface TestSchema {
  characters: State;
}

describe('CharactersFacade', () => {
  let facade: CharactersFacade;
  let store: Store<TestSchema>;
  const createCharactersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CharactersEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CHARACTERS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CharactersEffects]),
        ],
        providers: [CharactersFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(CharactersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allCharacters$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(CharactersActions.loadCharacters());

        list = await readFirst(facade.allCharacters$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadCharactersSuccess` to manually update list
     */
    it('allCharacters$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allCharacters$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          CharactersActions.loadCharactersSuccess({
            characters: [
              createCharactersEntity('AAA'),
              createCharactersEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allCharacters$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
