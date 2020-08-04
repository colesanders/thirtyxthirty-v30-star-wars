import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralsDetailComponent } from './generals-detail.component';

describe('GeneralsDetailComponent', () => {
  let component: GeneralsDetailComponent;
  let fixture: ComponentFixture<GeneralsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
