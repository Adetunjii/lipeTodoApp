import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CardComponent', () => {
  let fixtures: ComponentFixture<CardComponent>;
  let app: CardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixtures = TestBed.createComponent(CardComponent);
  });

  it('should create the card component', () => {
    app = fixtures.componentInstance;

    //assert
    expect(app).toBeTruthy();
  });
});
