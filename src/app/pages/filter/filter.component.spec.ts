import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerComponent } from './filter.component';

describe('CheckerComponent', () => {
  let component: CheckerComponent;
  let fixture: ComponentFixture<CheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
