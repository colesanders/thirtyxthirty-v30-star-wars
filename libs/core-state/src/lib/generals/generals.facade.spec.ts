import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { GeneralsEntity } from './generals.models';
import { GeneralsEffects } from './generals.effects';
import { GeneralsFacade } from './generals.facade';

import * as GeneralsSelectors from './generals.selectors';
import * as GeneralsActions from './generals.actions';
import {
  GENERALS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './generals.reducer';

interface TestSchema {
  generals: State;
}

describe('GeneralsFacade', () => {
  let facade: GeneralsFacade;
  let store: Store<TestSchema>;
  const createGeneralsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GeneralsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(GENERALS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([GeneralsEffects]),
        ],
        providers: [GeneralsFacade],
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
      facade = TestBed.get(GeneralsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allGenerals$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(GeneralsActions.loadGenerals());

        list = await readFirst(facade.allGenerals$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadGeneralsSuccess` to manually update list
     */
    it('allGenerals$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allGenerals$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          GeneralsActions.loadGeneralsSuccess({
            generals: [
              createGeneralsEntity('AAA'),
              createGeneralsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allGenerals$);
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
