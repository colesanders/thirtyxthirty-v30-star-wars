import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GENERALS_FEATURE_KEY,
  GeneralsState,
  generalAdapter
} from './generals.reducer';
import { General } from '@thirty/api-interfaces';

// Lookup the 'Generals' feature state managed by NgRx
export const getGeneralsState = createFeatureSelector<
  GeneralsState
>(GENERALS_FEATURE_KEY);

const { selectAll, selectEntities } = generalAdapter.getSelectors();

export const getGeneralsLoaded = createSelector(
  getGeneralsState,
  (state: GeneralsState) => state.loaded
);

export const getGeneralsError = createSelector(
  getGeneralsState,
  (state: GeneralsState) => state.error
);

export const getAllGenerals = createSelector(
  getGeneralsState,
  (state: GeneralsState) => selectAll(state)
);

export const getGeneralsEntities = createSelector(
  getGeneralsState,
  (state: GeneralsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getGeneralsState,
  (state: GeneralsState) => state.selectedId
);

export const getSelectedDataSet = createSelector(
  getGeneralsState,
  (state: GeneralsState) => state.selectedDataSet
);

export const getCount = createSelector(
  getGeneralsState,
  (state: GeneralsState) => state.count
);

export const getSelectedGeneral = createSelector(
  getGeneralsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);





