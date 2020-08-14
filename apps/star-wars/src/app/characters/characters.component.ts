import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CharactersFacade } from '@thirty/core-state'
import { Character } from '@thirty/api-interfaces';
import { SnackBarService } from '@thirty/material';
import { Animations } from '../animations';


@Component({
  selector: 'thirty-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  animations: Animations,
})
export class CharactersComponent implements OnInit {
  characters$: Observable<Character[]> = this.characterFacade.allCharacters$;
  character$: Observable<Character> = this.characterFacade.selectedCharacter$;
  count$: Observable<Number> = this.characterFacade.count$;
  detailOpen = false;
  searchTerm;

  constructor(
    private characterFacade: CharactersFacade,
    private router: Router,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.characterFacade.loadCharacters();
  }

  focusDetail(){
    this.detailOpen = true;
  }

  focusoutDetail(){
    this.detailOpen = false;
  }

  select(character: Character): void{
    this.characterFacade.selectCharacter(character.id);
    this.characterFacade.loadCharacter(character.id);
    this.focusDetail();
  }

  cancel(): void{
    this.focusoutDetail();
    this.router.navigate(['/characters']);
    this.characterFacade.resetSelectedCharacter();
  }

}
