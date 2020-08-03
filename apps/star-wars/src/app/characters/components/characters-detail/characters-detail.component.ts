import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Character } from '@thirty/api-interfaces';
import { CharactersFacade } from '@thirty/core-state';
import { SnackBarService } from '@thirty/material';


@Component({
  selector: 'thirty-characters-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.scss']
})
export class CharactersDetailComponent implements OnInit{
  @Input() character: Character;
  @Output() cancelled = new EventEmitter();


  constructor(
    private charactersFacade: CharactersFacade,
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if(this.character){
      this.charactersFacade.loadCharacter(this.character.id)
    }
  }

}
