import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiftyFiffty } from './fifty-fiffty';

describe('FiftyFiffty', () => {
  let component: FiftyFiffty;
  let fixture: ComponentFixture<FiftyFiffty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiftyFiffty],
    }).compileComponents();

    fixture = TestBed.createComponent(FiftyFiffty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
