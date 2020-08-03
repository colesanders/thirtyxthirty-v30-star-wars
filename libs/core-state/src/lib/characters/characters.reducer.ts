import { Character } from '@thirty/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CharactersActions from './characters.actions';

export const CHARACTERS_FEATURE_KEY = 'character';

export interface CharactersState extends EntityState<Character> {
  selectedId?: string | number; // which Characters record has been selected
  loaded: boolean; // has the Characters list been loaded
  error?: string | null; // last known error (if any)
  count?: number;
}

export interface CharactersPartialState {
  readonly [CHARACTERS_FEATURE_KEY]: CharactersState;
}

export const characterAdapter: EntityAdapter<Character> = createEntityAdapter();

export const initialCharactersState: CharactersState = characterAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _charactersReducer = createReducer(
  initialCharactersState,
  on(CharactersActions.resetCharacters, state => characterAdapter.removeAll(state)),
  on(CharactersActions.resetSelectedCharacter, state => Object.assign({}, state, { selectedId: null })),
  on(CharactersActions.selectCharacter, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  // Load characters
  on(
    CharactersActions.loadCharactersSuccess,
    (state, { characters, count }) =>
    characterAdapter.addMany(characters, { ...state, count, loaded: true })
  ),
  // Load character
  on(
    CharactersActions.loadCharacterSuccess,
    (state, { character }) =>
    characterAdapter.upsertOne(character, { ...state, loaded: true })
  ),
  // failure actions
  on(
    CharactersActions.loadCharacterFailure,
    CharactersActions.loadCharactersFailure,
    (state, { error }) => ({
      ...state,
      error
    })
  ),
  // load actions
  on(
    CharactersActions.loadCharacter,
    CharactersActions.loadCharacters,
    (state) => ({
      ...state,
      loaded: false,
      error: null
    })
  )
);

export function charactersReducer(state: CharactersState | undefined, action: Action) {
  return _charactersReducer(state, action);
}