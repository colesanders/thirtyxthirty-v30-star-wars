import { Component, OnInit, Input, Output, EventEmitter, Inject, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Character } from '@thirty/api-interfaces';
import { CharactersFacade, charactersReducer } from '@thirty/core-state';
import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'thirty-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit, OnChanges {
  @Input() characters: Character[];
  @Input() count = 5;
  @Output() selected = new EventEmitter<Character>();
  @Input() selectedCharacter: Character;

  myControl = new FormControl();
  filteredCharacter: Observable<Character[]>;

  pageSize = 3;
  pageSizeOptions: number[] = [3,5,8,10];
  pageIndex = 0;

  sliceStart = 0;
  sliceEnd = this.pageSize;

  constructor(
    private charactersFacade: CharactersFacade
  ) { }

  ngOnInit(): void {

    this.filteredCharacter = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.characters.slice())
    );
  }

  ngOnChanges(){
    if(this.characters?.length > this.count){
      this.count = this.characters.length
    }
  }

  private _filter(value: string): Character[] {
    const filterValue = value.toLowerCase();

    return this.characters.filter(character => character.name.toLowerCase().includes(filterValue));
  }

  updatePageSlice(pageEvent){
    this.pageSize = pageEvent.pageSize

    this.sliceStart = pageEvent.pageIndex * pageEvent.pageSize;
    this.sliceEnd = (pageEvent.pageIndex + 1) * pageEvent.pageSize;
    if(this.sliceEnd>this.characters.length){
      const nextPage = Math.floor(this.sliceEnd / 10)+1;
      this.charactersFacade.loadCharactersByPage(nextPage);
    }
  }

  displayFn(character: Character): string {
    return character && character.name ? character.name : '';
  }

  select(character: Character){
    this.selected.emit(character)
  }
}
