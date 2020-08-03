import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { CharactersComponent } from './characters.component';
import { CharactersDetailComponent } from './components/characters-detail/characters-detail.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersFacade } from '@thirty/core-state';
import { Character } from '@thirty/api-interfaces';

const mockCharactersFacade = {
  loadCharacters: () => of({}),
  mutations$: {
    subscribe: () => of({})
  },
  selectCharacter: (id:string) =>  {
    selectedCharacter.id = id;
  }
}

const selectedCharacter: Character = {
  id: '',
  name: '',
  description: '',
  color: '',
  favorite: false,
  icon: '',
  amount: 0,
}

const mockCharacter: Character = {
  id: '0',
  name: 'mock',
  description: '',
  color: '',
  favorite: true,
  icon: '',
  amount: 1,
}

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let de: DebugElement;
  let characterFacade: CharactersFacade

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: CharactersFacade, useValue: mockCharactersFacade }
      ],
      declarations: [ 
        CharactersComponent,
        CharactersListComponent,
        CharactersDetailComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    characterFacade = de.injector.get(CharactersFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select', () => {
    component.select(mockCharacter);
    expect(selectedCharacter).toMatchObject(mockCharacter);
  });


  it('should open detail', () => {
    component.focusDetail();
    expect(component.detailOpen).toBe(true);
  });

  it('should close detail', () => {
    component.focusoutDetail();
    expect(component.detailOpen).toBe(false);
  });

});
