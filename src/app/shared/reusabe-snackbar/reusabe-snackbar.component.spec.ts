import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusabeSnackbarComponent } from './reusabe-snackbar.component';

describe('ReusabeSnackbarComponent', () => {
  let component: ReusabeSnackbarComponent;
  let fixture: ComponentFixture<ReusabeSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReusabeSnackbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReusabeSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
