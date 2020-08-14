import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralsOverviewComponent } from './generals-overview.component';
import { of } from 'rxjs';
import { General } from '@thirty/api-interfaces';
import { GeneralsFacade } from '@thirty/core-state';
import { MaterialModule } from '@thirty/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DebugElement } from '@angular/core';

const mockGeneralsFacade = {
  loadGenerals: () => of({}),
  loadGeneral: () => {},
  mutations$: {
    subscribe: () => of({})
  },
  selectGeneral: (id:string) =>  {
    selectedGeneral.id = id;
  }
}

const selectedGeneral: General = {
  id: '',
  name: '',
}

const mockGeneral: General = {
  id: '0',
  name: ''
}

describe('GeneralsOverviewComponent', () => {
  let component: GeneralsOverviewComponent;
  let fixture: ComponentFixture<GeneralsOverviewComponent>;
  let de: DebugElement;
  let router: Router;
  let mockActivatedRoute, mockRouter;

  beforeEach(async(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '3' }}
    };
    mockRouter = {
      navigate: () => {}
    }

    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [ GeneralsOverviewComponent ],
      providers: [
        { provide: GeneralsFacade, useValue: mockGeneralsFacade },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralsOverviewComponent);
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
