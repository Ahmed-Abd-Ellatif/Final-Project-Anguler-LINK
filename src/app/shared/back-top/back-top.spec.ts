import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackTop } from './back-top';

describe('BackTop', () => {
  let component: BackTop;
  let fixture: ComponentFixture<BackTop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackTop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackTop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
