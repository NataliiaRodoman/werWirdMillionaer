import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhoneFriend } from './phone-friend';

describe('PhoneFriend', () => {
  let component: PhoneFriend;
  let fixture: ComponentFixture<PhoneFriend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneFriend],
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneFriend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
