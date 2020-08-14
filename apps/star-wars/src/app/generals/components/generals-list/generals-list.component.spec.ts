import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';

import { GeneralsListComponent } from './generals-list.component';
import { GeneralsFacade } from '@thirty/core-state';
import { General } from '@thirty/api-interfaces';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

const mockGeneralsFacade = {
  loadGenerals: () => of({}),
  loadGeneral: () => {},
  loadGeneralsByPage: (page) => {},
  mutations$: {
    subscribe: () => of({})
  },
  selectGeneral: (id:string) =>  {
    selectedGeneral.id = id;
  }
}

const selectedGeneral: General = {
  id: '0',
  name: '',
}

const mockGeneral: General = {
  id: '0',
  name: 'mock'
}

const GENERALS = [
  { id: 0, name: 'one'},
  { id: 2, name: 'two'},
  { id: 3, name: 'three'},
  { id: 4, name: 'four'},
  { id: 5, name: 'five'},
  { id: 6, name: 'six'},
]

describe('GeneralsListComponent', () => {
  let component: GeneralsListComponent;
  let fixture: ComponentFixture<GeneralsListComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralsListComponent ],
      imports: [
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: GeneralsFacade, useValue: mockGeneralsFacade }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralsListComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.generals = GENERALS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set count to length of characters, if characters is bigger', () => {
    component.ngOnChanges();
    expect(component.count).toBe(GENERALS.length);
  });

  it('should select character', () => {
    const spy = jest.spyOn(component, 'select')

    const Characters = de.queryAll(By.css('mat-list-item'))
    Characters[0].triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(GENERALS[0]);
  })

  it('should set sliceStart and sliceEnd properly', () => {
    component.updatePageSlice({ pageSize: 5, pageIndex: 0 });

    expect(component.sliceStart).toBe(0);
    expect(component.sliceEnd).toBe(5);
  })

  it('should set next page if out of bounds', () => {
    component.updatePageSlice({ pageSize: 10, pageIndex: 1 });
  })

  it('should filter generals', () => {
    component.myControl.patchValue('one');

    let filterset;
    component.filteredGeneral.subscribe(generals => filterset = generals);

    expect(filterset).toMatchSnapshot();
  })
});
