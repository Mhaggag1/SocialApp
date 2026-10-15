import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainfeedComponent } from './mainfeed.component';

describe('MainfeedComponent', () => {
  let component: MainfeedComponent;
  let fixture: ComponentFixture<MainfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainfeedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainfeedComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
