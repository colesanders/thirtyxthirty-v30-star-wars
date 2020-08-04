import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { GeneralsComponent } from './generals.component';
import { GeneralsDetailComponent } from './components/generals-detail/generals-detail.component';
import { GeneralsListComponent } from './components/generals-list/generals-list.component';
import { GeneralsFacade } from '@thirty/core-state';
import { General } from '@thirty/api-interfaces';

const mockGeneralsFacade = {
  loadGenerals: () => of({}),
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
  description: '',
  color: '',
  favorite: false,
  icon: '',
  amount: 0,
}

const mockGeneral: General = {
  id: '0',
  name: 'mock',
  description: '',
  color: '',
  favorite: true,
  icon: '',
  amount: 1,
}

describe('GeneralsComponent', () => {
  let component: GeneralsComponent;
  let fixture: ComponentFixture<GeneralsComponent>;
  let de: DebugElement;
  let generalFacade: GeneralsFacade

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
        { provide: GeneralsFacade, useValue: mockGeneralsFacade }
      ],
      declarations: [ 
        GeneralsComponent,
        GeneralsListComponent,
        GeneralsDetailComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    generalFacade = de.injector.get(GeneralsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select', () => {
    component.select(mockGeneral);
    expect(selectedGeneral).toMatchObject(mockGeneral);
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
