import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';

import { CharactersListComponent } from './characters-list.component';
import { Character } from '@thirty/api-interfaces';
import { of } from 'rxjs';
import { CharactersFacade } from '@thirty/core-state';
import { By } from '@angular/platform-browser';

const mockCharactersFacade = {
  loadCharacters: () => of({}),
  loadCharactersByPage: (page) => {},
  loadCharacter: () => {},
  mutations$: {
    subscribe: () => of({})
  },
  selectCharacter: (id:string) =>  {
    selectedCharacter.id = id;
  }
}

const selectedCharacter: Character = {
  id: '0',
  name: '',
}

const mockCharacter: Character = {
  id: '0',
  name: 'mock',
}

const CHARACTERS = [
  { id: 0, name: 'one'},
  { id: 2, name: 'two'},
  { id: 3, name: 'three'},
  { id: 4, name: 'four'},
  { id: 5, name: 'five'},
  { id: 6, name: 'six'},
]

describe('CharactersListComponent', () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersListComponent ],
      imports: [
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: CharactersFacade, useValue: mockCharactersFacade }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersListComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.characters = CHARACTERS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set count to length of characters, if characters is bigger', () => {
    component.ngOnChanges();
    expect(component.count).toBe(CHARACTERS.length);
  });

  it('should select character', () => {
    const spy = jest.spyOn(component, 'select')

    const Characters = de.queryAll(By.css('mat-list-item'))
    Characters[0].triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(CHARACTERS[0]);
  })

  it('should set sliceStart and sliceEnd properly', () => {
    component.updatePageSlice({ pageSize: 5, pageIndex: 0 });

    expect(component.sliceStart).toBe(0);
    expect(component.sliceEnd).toBe(5);
  })

  it('should set next page if out of bounds', () => {
    component.updatePageSlice({ pageSize: 10, pageIndex: 1 });
  })

  it('should filter characters', () => {
    component.myControl.patchValue('one');

    let filterset;
    component.filteredCharacter.subscribe(characters => filterset = characters);

    expect(filterset).toMatchSnapshot();
  })
});
