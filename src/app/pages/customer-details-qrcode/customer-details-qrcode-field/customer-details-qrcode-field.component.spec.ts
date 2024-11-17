import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsQrcodeFieldComponent } from './customer-details-qrcode-field.component';

describe('CustomerDetailsQrcodeFieldComponent', () => {
  let component: CustomerDetailsQrcodeFieldComponent;
  let fixture: ComponentFixture<CustomerDetailsQrcodeFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDetailsQrcodeFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDetailsQrcodeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
