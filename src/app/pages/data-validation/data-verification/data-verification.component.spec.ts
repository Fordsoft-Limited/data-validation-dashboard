import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVerificationComponent } from './data-verification.component';

describe('DataVerificationComponent', () => {
  let component: DataVerificationComponent;
  let fixture: ComponentFixture<DataVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataVerificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
