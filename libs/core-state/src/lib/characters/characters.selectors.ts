import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CHARACTERS_FEATURE_KEY,
  CharactersState,
  characterAdapter
} from './characters.reducer';
import { Character } from '@thirty/api-interfaces';

// Lookup the 'Characters' feature state managed by NgRx
export const getCharactersState = createFeatureSelector<
  CharactersState
>(CHARACTERS_FEATURE_KEY);

const { selectAll, selectEntities } = characterAdapter.getSelectors();

export const getCharactersLoaded = createSelector(
  getCharactersState,
  (state: CharactersState) => state.loaded
);

export const getCharactersError = createSelector(
  getCharactersState,
  (state: CharactersState) => state.error
);

export const getAllCharacters = createSelector(
  getCharactersState,
  (state: CharactersState) => selectAll(state)
);

export const getCharactersEntities = createSelector(
  getCharactersState,
  (state: CharactersState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCharactersState,
  (state: CharactersState) => state.selectedId
);

export const getCount = createSelector(
  getCharactersState,
  (state: CharactersState) => state.count
);

export const getSelectedCharacter = createSelector(
  getCharactersEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);





