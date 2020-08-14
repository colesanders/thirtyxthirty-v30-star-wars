import { Component, OnInit, Input, Output, EventEmitter, Inject, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms'
import { General } from '@thirty/api-interfaces';
import { GeneralsFacade, generalsReducer } from '@thirty/core-state';
import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'thirty-generals-list',
  templateUrl: './generals-list.component.html',
  styleUrls: ['./generals-list.component.scss']
})
export class GeneralsListComponent implements OnInit, OnChanges {
  @Input() generals: General[];
  @Input() dataSet;
  @Input() dataSetRoute;
  @Input() count = 5;
  @Output() selected = new EventEmitter<General>();
  @Input() selectedGeneral: General;

  myControl = new FormControl();
  filteredGeneral: Observable<General[]>;

  pageSize = 3;
  pageSizeOptions: number[] = [3,5,8,10];
  pageIndex = 0;

  sliceStart = 0;
  sliceEnd = this.pageSize;

  constructor(
    private generalsFacade: GeneralsFacade
  ) { }

  ngOnInit(): void {
    this.filteredGeneral = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value[this.dataSet]),
      map(name => name ? this._filter(name) : this.generals.slice())
    );
  }

  ngOnChanges(){
    if(this.generals?.length > this.count){
      this.count = this.generals.length
    }
  }

  private _filter(value: string): General[] {
    const filterValue = value.toLowerCase();

    return this.generals.filter(general => general.name.toLowerCase().includes(filterValue));
  }

  updatePageSlice(pageEvent){
    this.pageSize = pageEvent.pageSize

    this.sliceStart = pageEvent.pageIndex * pageEvent.pageSize;
    this.sliceEnd = (pageEvent.pageIndex + 1) * pageEvent.pageSize;
    if(this.sliceEnd>this.generals.length){
      const nextPage = Math.floor(this.sliceEnd / 10)+1;
      this.generalsFacade.loadGeneralsByPage(nextPage);
    }
  }

  displayFn(general: General): string {
    return general && general.name ? general.name : '';
  }

  select(general: General){
    this.selected.emit(general)
  }
}
