import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAuthLayoutComponent } from './auth-auth-layout.component';

describe('AuthAuthLayoutComponent', () => {
  let component: AuthAuthLayoutComponent;
  let fixture: ComponentFixture<AuthAuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthAuthLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthAuthLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
