import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswrodComponent } from './forgot-passwrod.component';

describe('ForgotPasswrodComponent', () => {
  let component: ForgotPasswrodComponent;
  let fixture: ComponentFixture<ForgotPasswrodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswrodComponent]
    });
    fixture = TestBed.createComponent(ForgotPasswrodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
