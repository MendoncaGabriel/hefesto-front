import { Component, Input, computed } from '@angular/core';
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";
import { CommonModule, NgClass } from '@angular/common';
import { MetricChartComponent } from "../metric-chart/metric-chart.component";

@Component({
  selector: 'app-card-line',
  imports: [ProgressBarComponent, NgClass, CommonModule, MetricChartComponent],
  templateUrl: './card-line.component.html',
  styleUrl: './card-line.component.css'
})
export class CardLineComponent {
  @Input() title: string = "";
  @Input() current: number = 0;
  @Input() max: number = 100;

  alert = computed(() => {
    const progress = (this.current / this.max) * 100;
    if (progress >= 65 && progress <= 75) {
      return true
    }
    return false
  })

  pulse = computed(() => {
    const progress = (this.current / this.max) * 100;
    if (progress >= 75) {
      return true
    }
    return false
  });

  active = computed(() => {
    const purity = (this.current / this.max) * 100;
    if (purity > 0 ) {
      return true
    }
    return false
  })
}
