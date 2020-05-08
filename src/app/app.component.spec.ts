import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents;

    fixture = TestBed.createComponent(AppComponent);
  });

  //confirm that the component is created.
  it('should create the app component', () => {
    //act
    app = fixture.componentInstance;
    //assert
    expect(app).toBeTruthy();
  });

  //confirm that it has a title of LIPE-to-do-App

  it(`should have a title of 'LIPE-to-do-App'`, () => {
    //act
    app = fixture.componentInstance;

    //assert
    expect(app.title).toBe('LIPE-to-do-App');
  });
});
