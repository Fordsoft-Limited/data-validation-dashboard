import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateCustomerReviewComponent } from './validate-customer-review.component';

describe('ValidateCustomerReviewComponent', () => {
  let component: ValidateCustomerReviewComponent;
  let fixture: ComponentFixture<ValidateCustomerReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidateCustomerReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidateCustomerReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
