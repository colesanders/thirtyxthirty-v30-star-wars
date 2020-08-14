import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@thirty/material';

import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { LoginService, LoginComponent, UiLoginModule } from '@thirty/ui-login';
import { of } from 'rxjs';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
]

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let mockLoginService;

  beforeEach(async(() => {
    mockLoginService = {
      logout: () => {},
      isAuthenticated$: of(true),
    }

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
        UiLoginModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        { provide: LoginService, useValue: mockLoginService },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should logout on logout', () => {
    const spy = jest.spyOn(component, 'logout')

    const Buttons = de.queryAll(By.css('button'))
    Buttons[1].triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  })
});
