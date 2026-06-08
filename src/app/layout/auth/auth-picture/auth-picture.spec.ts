import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPicture } from './auth-picture';

describe('AuthPicture', () => {
  let component: AuthPicture;
  let fixture: ComponentFixture<AuthPicture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPicture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPicture);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
