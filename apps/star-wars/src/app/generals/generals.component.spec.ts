import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { GeneralsComponent } from './generals.component';
import { GeneralsDetailComponent } from './components/generals-detail/generals-detail.component';
import { GeneralsListComponent } from './components/generals-list/generals-list.component';
import { GeneralsFacade } from '@thirty/core-state';
import { General, StarWarsDataSets, getDataSet } from '@thirty/api-interfaces';
import { ActivatedRoute, Router } from '@angular/router';

const mockGeneralsFacade = {
  loadGenerals: () => of({}),
  loadGeneral: () => {},
  mutations$: {
    subscribe: () => of({})
  },
  allGenerals$ : of([]),
  selectGeneral: (id:string) =>  {
    selectedGeneral.id = id;
  },
  selectDataSet: (dataSet: any) => {},
  resetSelectedGeneral: () => {},
}

const selectedGeneral: General = {
  id: '',
  name: '',
}

const mockGeneral: General = {
  id: '0',
  name: ''
}

describe('GeneralsComponent', () => {
  let component: GeneralsComponent;
  let fixture: ComponentFixture<GeneralsComponent>;
  let de: DebugElement;
  let generalsFacade: GeneralsFacade;
  let mockActivatedRoute, mockRouter;

  beforeEach(async(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '3' }},
      url: of([{ path: 'people' }, { path: 'films' }])
    };
    mockRouter = {
      navigate: () => {}
    }

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: GeneralsFacade, useValue: mockGeneralsFacade },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
      declarations: [ 
        GeneralsComponent,
        GeneralsListComponent,
        GeneralsDetailComponent,
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    generalsFacade = de.injector.get(GeneralsFacade);
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
    const spy = jest.spyOn(generalsFacade, 'selectGeneral')

    component.select(mockGeneral);

    expect(spy).toHaveBeenCalledWith(mockGeneral.id);
  });

  it('should call the character facade on cancel', () => {
    const spy = jest.spyOn(generalsFacade, 'resetSelectedGeneral')

    component.cancel();

    expect(spy).toHaveBeenCalled();
  });

});
