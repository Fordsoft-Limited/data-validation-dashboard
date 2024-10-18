import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailFieldComponent } from './customer-detail-field.component';

describe('CustomerDetailFieldComponent', () => {
  let component: CustomerDetailFieldComponent;
  let fixture: ComponentFixture<CustomerDetailFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDetailFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDetailFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
