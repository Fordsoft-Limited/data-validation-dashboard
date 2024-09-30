import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerValidationComponent } from './customer-validation.component';

describe('CustomerValidationComponent', () => {
  let component: CustomerValidationComponent;
  let fixture: ComponentFixture<CustomerValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
