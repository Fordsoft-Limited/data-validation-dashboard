import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsQrcodeComponent } from './customer-details-qrcode.component';

describe('CustomerDetailsQrcodeComponent', () => {
  let component: CustomerDetailsQrcodeComponent;
  let fixture: ComponentFixture<CustomerDetailsQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDetailsQrcodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDetailsQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
