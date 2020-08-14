import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersOverviewComponent } from './characters-overview.component';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';
import { Character } from '@thirty/api-interfaces';
import { CharactersFacade } from '@thirty/core-state';
import { ActivatedRoute, Router } from '@angular/router';
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

describe('CharactersOverviewComponent', () => {
  let component: CharactersOverviewComponent;
  let fixture: ComponentFixture<CharactersOverviewComponent>;
  let de: DebugElement;
  let router: Router;
  let mockActivatedRoute;
  let mockRouter;

  beforeEach(async(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '3' }}
    };
    mockRouter = {
      navigate: (arr: string[]) => {}
    }

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
      ],
      declarations: [ CharactersOverviewComponent ],
      providers: [
        { provide: CharactersFacade, useValue: mockCharactersFacade },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersOverviewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    router = de.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call router on close', () => {
    const spy = jest.spyOn(router, 'navigate')

    component.close();

    expect(spy).toHaveBeenCalled();
  })
});
