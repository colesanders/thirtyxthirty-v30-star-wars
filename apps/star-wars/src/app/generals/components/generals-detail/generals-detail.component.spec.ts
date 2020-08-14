import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralsDetailComponent } from './generals-detail.component';
import { GeneralsFacade } from '@thirty/core-state';
import { General } from '@thirty/api-interfaces';
import { of } from 'rxjs';
import { MaterialModule } from '@thirty/material';
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

describe('GeneralsDetailComponent', () => {
  let component: GeneralsDetailComponent;
  let fixture: ComponentFixture<GeneralsDetailComponent>;
  let de: DebugElement;
  let generalsFacade: GeneralsFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [ GeneralsDetailComponent ],
      providers: [
        { provide: GeneralsFacade, useValue: mockGeneralsFacade }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralsDetailComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    generalsFacade = de.injector.get(GeneralsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call facade if general', () => {
    const spy = jest.spyOn(generalsFacade, 'loadGeneral')
    component.general = mockGeneral;

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith(mockGeneral.id);
  })
});
