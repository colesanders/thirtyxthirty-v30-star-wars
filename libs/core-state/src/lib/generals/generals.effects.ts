import { Injectable } from '@angular/core';
import { GeneralsService } from '@thirty/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap, exhaust, exhaustMap, catchError } from 'rxjs/operators';
import * as GeneralsActions from './generals.actions';
import { General, ApiObj } from '@thirty/api-interfaces';
import { merge, of } from 'rxjs';

@Injectable()
export class GeneralsEffects {
  @Effect() loadGenerals$ = this.actions$.pipe(
    ofType(GeneralsActions.loadGenerals),
    fetch({
      run: (action) => this.generalsService.all(action.dataSet).pipe(
        map((apiObj: ApiObj) => {
          const generals: General[] = apiObj.results;
          const count: number = apiObj.count;
          generals.map((general) => {
            const regArr = general.url.match('[0-9]+');
            general.id = +regArr[0];
          })

          return GeneralsActions.loadGeneralsSuccess({ generals, count })
        })
      ),
      onError: (action, error) => GeneralsActions.loadGeneralsFailure({ error })
    })
  );

  @Effect() loadGeneralsByPage$ = this.actions$.pipe(
    ofType(GeneralsActions.loadGeneralsByPage),
    fetch({
      run: (action) => this.generalsService.byPage(action.dataSet, action.page).pipe(
        map((apiObj: ApiObj) => {
          const generals: General[] = apiObj.results;
          const count: number = apiObj.count;
          generals.map((general) => {
            const regArr = general.url.match('[0-9]+');
            general.id = +regArr[0];
          })
          return GeneralsActions.loadGeneralsByPageSuccess({ generals, count })
        })
      ),
      onError: (action, error) => GeneralsActions.loadGeneralsFailure({ error })
    })
  );

  @Effect() loadGeneral$ = this.actions$.pipe(
    ofType(GeneralsActions.loadGeneral),
    fetch({
      run: (action) => this.generalsService.byId(action.dataSet, action.generalId).pipe(
        map((general: General) => {
          general.id = action.generalId;
          return GeneralsActions.loadGeneralSuccess({ general })
        })
      ),
      onError: (action, error) => GeneralsActions.loadGeneralFailure({ error })
    })
  );

  

  constructor(
    private actions$: Actions,
    private generalsService: GeneralsService
  ) {}
}