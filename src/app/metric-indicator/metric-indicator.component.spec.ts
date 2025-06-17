import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricIndicatorComponent } from './metric-indicator.component';

describe('MetricIndicatorComponent', () => {
  let component: MetricIndicatorComponent;
  let fixture: ComponentFixture<MetricIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
