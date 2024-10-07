import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkCustomerValidationComponent } from './bulk-customer-validation.component';

describe('BulkCustomerValidationComponent', () => {
  let component: BulkCustomerValidationComponent;
  let fixture: ComponentFixture<BulkCustomerValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulkCustomerValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BulkCustomerValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
