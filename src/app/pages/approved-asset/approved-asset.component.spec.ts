import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedAssetComponent } from './approved-asset.component';

describe('ApprovedAssetComponent', () => {
  let component: ApprovedAssetComponent;
  let fixture: ComponentFixture<ApprovedAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovedAssetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovedAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
