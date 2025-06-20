import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvenMetrics } from './oven-metrics.component';

describe('CardLineComponent', () => {
  let component: OvenMetrics;
  let fixture: ComponentFixture<OvenMetrics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OvenMetrics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OvenMetrics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
