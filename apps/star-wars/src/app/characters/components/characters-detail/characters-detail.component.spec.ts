import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersDetailComponent } from './characters-detail.component';
import { MaterialModule } from '@thirty/material';
import { Character } from '@thirty/api-interfaces';
import { of } from 'rxjs';
import { CharactersFacade } from '@thirty/core-state';
import { DebugElement } from '@angular/core';

const mockCharactersFacade = {
  loadCharacters: () => of({}),
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

describe('CharactersDetailComponent', () => {
  let component: CharactersDetailComponent;
  let fixture: ComponentFixture<CharactersDetailComponent>;
  let de: DebugElement;
  let characterFacade: CharactersFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
      ],
      declarations: [ CharactersDetailComponent ],
      providers: [
        { provide: CharactersFacade, useValue: mockCharactersFacade }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersDetailComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    characterFacade = de.injector.get(CharactersFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call facade if character', () => {
    const spy = jest.spyOn(characterFacade, 'loadCharacter')
    component.character = mockCharacter;

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith(mockCharacter.id);
  })
});
