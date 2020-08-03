import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCharacters from './characters/characters.reducer';
import { CharactersEffects } from './characters/characters.effects';
import { CharactersFacade } from './characters/characters.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCharacters.CHARACTERS_FEATURE_KEY,
      fromCharacters.charactersReducer
    ),
    EffectsModule.forFeature([CharactersEffects]),
  ],
  providers: [CharactersFacade],
})
export class CoreStateModule {}
