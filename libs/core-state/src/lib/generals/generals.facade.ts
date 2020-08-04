import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';

import { General } from '@thirty/api-interfaces';

import * as GeneralsActions from './generals.actions';
import * as fromGenerals from './generals.reducer';
import * as GeneralsSelectors from './generals.selectors';

@Injectable({
  providedIn: 'root'
})
export class GeneralsFacade {
  loaded$ = this.store.pipe(select(GeneralsSelectors.getGeneralsLoaded));
  allGenerals$ = this.store.pipe(select(GeneralsSelectors.getAllGenerals));
  selectedGeneral$ = this.store.pipe(select(GeneralsSelectors.getSelectedGeneral));
  count$ = this.store.pipe(select(GeneralsSelectors.getCount));
  selectedDataSet$ = this.store.pipe(select(GeneralsSelectors.getSelectedDataSet));
  dataSet;

  constructor(private store: Store, private actions$: ActionsSubject) { }

  selectGeneral(selectedId: number) {
    this.dispatch(GeneralsActions.selectGeneral({ selectedId }));
  }

  selectDataSet(selectedDataSet: string) {
    this.dispatch(GeneralsActions.selectDataSet({ selectedDataSet }));

    this.selectedDataSet$
    .subscribe((data) => {
      this.dataSet = data;
    })
  }

  resetSelectedGeneral(){
    this.dispatch(GeneralsActions.resetSelectedGeneral());
  }

  loadGenerals() {
    this.dispatch(GeneralsActions.loadGenerals({ dataSet: this.dataSet }));
  }

  loadCharactesByPage(page: number){
    this.dispatch(GeneralsActions.loadGeneralsByPage({ dataSet: this.dataSet, page }));
  }

  loadGeneral(generalId: number) {
    this.dispatch(GeneralsActions.loadGeneral({ dataSet: this.dataSet, generalId }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
