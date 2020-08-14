import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { CharactersComponent } from './characters.component';
import { CharactersDetailComponent } from './components/characters-detail/characters-detail.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersFacade } from '@thirty/core-state';
import { Character } from '@thirty/api-interfaces';
import { Router } from '@angular/router';

const mockCharactersFacade = {
  loadCharacters: () => of({}),
  loadCharacter: () => {},
  mutations$: {
    subscribe: () => of({})
  },
  allCharacters$ : of([]),
  selectCharacter: (id:string) =>  {
    selectedCharacter.id = id;
  },
  resetSelectedCharacter: () => {},
}

const selectedCharacter: Character = {
  id: '0',
  name: '',
}

const mockCharacter: Character = {
  id: '0',
  name: 'mock',
}

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let de: DebugElement;
  let characterFacade: CharactersFacade;
  let mockRouter;

  beforeEach(async(() => {
    mockRouter = {
      navigate: () => {}
    }



    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: CharactersFacade, useValue: mockCharactersFacade },
        { provide: Router, useValue: mockRouter },
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

  it('should open detail', () => {
    component.focusDetail();
    expect(component.detailOpen).toBe(true);
  });

  it('should close detail', () => {
    component.focusoutDetail();
    expect(component.detailOpen).toBe(false);
  });

  it('should call the character facade on select', () => {
    const spy = jest.spyOn(characterFacade, 'selectCharacter')

    component.select(mockCharacter);

    expect(spy).toHaveBeenCalledWith(mockCharacter.id);
  });

  it('should call the character facade on cancel', () => {
    const spy = jest.spyOn(characterFacade, 'resetSelectedCharacter')

    component.cancel();

    expect(spy).toHaveBeenCalled();
  });

});
