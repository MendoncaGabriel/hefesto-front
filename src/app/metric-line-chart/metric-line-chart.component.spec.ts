import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricLineChartComponent } from './metric-line-chart.component';

describe('MetricLineChartComponent', () => {
  let component: MetricLineChartComponent;
  let fixture: ComponentFixture<MetricLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricLineChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
