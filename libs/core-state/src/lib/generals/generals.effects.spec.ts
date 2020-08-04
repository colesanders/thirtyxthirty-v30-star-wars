import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { GeneralsEffects } from './generals.effects';
import * as GeneralsActions from './generals.actions';

describe('GeneralsEffects', () => {
  let actions: Observable<any>;
  let effects: GeneralsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        GeneralsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(GeneralsEffects);
  });

  describe('loadGenerals$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: GeneralsActions.loadGenerals() });

      const expected = hot('-a-|', {
        a: GeneralsActions.loadGeneralsSuccess({ generals: [] }),
      });

      expect(effects.loadGenerals$).toBeObservable(expected);
    });
  });
});
