import { General } from '@thirty/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedGeneral = createAction('[Generals] Reset Selected General');
export const resetGenerals = createAction('[Generals] Reset Generals');

// Select General
export const selectGeneral = createAction(
  '[Generals] Select General',
  props<{ selectedId: number }>()
);

// Select DataSet
export const selectDataSet = createAction(
  '[Generals] Select DataSet',
  props<{ selectedDataSet: string }>()
);

// Load Generals
export const loadGenerals = createAction(
  '[Generals] Load Generals',
  props<{ dataSet: string }>()
);

// Load Many Generals - payload: names[string] -> loaded
export const loadManyGenerals = createAction(
  '[Generals] Load Many Generals',
  props<{ generalNames: string[] }>()
);

export const loadGeneralsSuccess = createAction(
  '[Generals] Load Generals Success',
  props<{ generals: General[], count?: number }>()
);

export const loadGeneralsFailure = createAction(
  '[Generals] Load Generals Failure',
  props<{ error: any }>()
);

// Load General by page - payload: page -> loaded
export const loadGeneralsByPage = createAction(
  '[Generals] Load Generals By Page',
  props<{ dataSet: string, page: number }>()
);
export const loadGeneralsByPageSuccess = createAction(
  '[Generals] Load Generals By Page Success',
  props<{ generals: General[], count?: number }>()
);


// Load General
export const loadGeneral = createAction(
  '[Generals] Load General',
  props<{ dataSet: string, generalId: number }>()
);

export const loadGeneralSuccess = createAction(
  '[Generals] Load General Success',
  props<{ general: General }>()
);

export const loadGeneralFailure = createAction(
  '[Generals] Load General Failure',
  props<{ error: any }>()
);
