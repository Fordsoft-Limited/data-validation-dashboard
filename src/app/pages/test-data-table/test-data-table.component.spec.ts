import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDataTableComponent } from './test-data-table.component';

describe('TestDataTableComponent', () => {
  let component: TestDataTableComponent;
  let fixture: ComponentFixture<TestDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestDataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
