import { General } from '@thirty/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as GeneralsActions from './generals.actions';
import { Data } from '@angular/router';

export const GENERALS_FEATURE_KEY = 'general';

export interface GeneralsState extends EntityState<General> {
  selectedId?: string | number; // which Generals record has been selected
  selectedDataSet?: string,
  loaded: boolean; // has the Generals list been loaded
  error?: string | null; // last known error (if any)
  count?: number;
}

export interface GeneralsPartialState {
  readonly [GENERALS_FEATURE_KEY]: GeneralsState;
}

export const generalAdapter: EntityAdapter<General> = createEntityAdapter();

export const initialGeneralsState: GeneralsState = generalAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _generalsReducer = createReducer(
  initialGeneralsState,
  on(GeneralsActions.resetGenerals, state => generalAdapter.removeAll(state)),
  on(GeneralsActions.resetSelectedGeneral, state => Object.assign({}, state, { selectedId: null })),
  on(GeneralsActions.selectGeneral, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(GeneralsActions.selectDataSet, (state, { selectedDataSet }) =>
    Object.assign({}, state, { selectedDataSet })
  ),
  // Load generals
  on(
    GeneralsActions.loadGeneralsSuccess,
    (state, { generals, count }) =>
    generalAdapter.setAll(generals, { ...state, count, loaded: true })
  ),
  // Load generals
  on(
    GeneralsActions.loadGeneralsByPageSuccess,
    (state, { generals, count }) =>
    generalAdapter.addMany(generals, { ...state, count, loaded: true })
  ),
  // Load general
  on(
    GeneralsActions.loadGeneralSuccess,
    (state, { general }) =>
    generalAdapter.upsertOne(general, { ...state, loaded: true })
  ),
  // failure actions
  on(
    GeneralsActions.loadGeneralFailure,
    GeneralsActions.loadGeneralsFailure,
    (state, { error }) => ({
      ...state,
      error
    })
  ),
  // load actions
  on(
    GeneralsActions.loadGeneral,
    GeneralsActions.loadGenerals,
    (state) => ({
      ...state,
      loaded: false,
      error: null
    })
  )
);

export function generalsReducer(state: GeneralsState | undefined, action: Action) {
  return _generalsReducer(state, action);
}