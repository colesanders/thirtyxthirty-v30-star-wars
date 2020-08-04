import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralsOverviewComponent } from './generals-overview.component';

describe('GeneralsOverviewComponent', () => {
  let component: GeneralsOverviewComponent;
  let fixture: ComponentFixture<GeneralsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
