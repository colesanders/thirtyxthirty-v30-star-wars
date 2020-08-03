import { Character } from '@thirty/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedCharacter = createAction('[Characters] Reset Selected Character');
export const resetCharacters = createAction('[Characters] Reset Characters');

// Select Character
export const selectCharacter = createAction(
  '[Characters] Select Character',
  props<{ selectedId: number }>()
);

// Load Characters
export const loadCharacters = createAction('[Characters] Load Characters');

// Load Many Characters - payload: names[string] -> loaded
export const loadManyCharacters = createAction(
  '[Characters] Load Many Characters',
  props<{ characterNames: string[] }>()
);

export const loadCharactersSuccess = createAction(
  '[Characters] Load Characters Success',
  props<{ characters: Character[], count?: number }>()
);

export const loadCharactersFailure = createAction(
  '[Characters] Load Characters Failure',
  props<{ error: any }>()
);

// Load Character by page - payload: page -> loaded
export const loadCharactersByPage = createAction(
  '[Characters] Load Characters By Page',
  props<{ page: number }>()
);


// Load Character
export const loadCharacter = createAction(
  '[Characters] Load Character',
  props<{ characterId: number }>()
);

export const loadCharacterSuccess = createAction(
  '[Characters] Load Character Success',
  props<{ character: Character }>()
);

export const loadCharacterFailure = createAction(
  '[Characters] Load Character Failure',
  props<{ error: any }>()
);
