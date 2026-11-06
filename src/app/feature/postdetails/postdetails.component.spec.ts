import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostdetailsComponent } from './postdetails.component';

describe('PostdetailsComponent', () => {
  let component: PostdetailsComponent;
  let fixture: ComponentFixture<PostdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostdetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostdetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
