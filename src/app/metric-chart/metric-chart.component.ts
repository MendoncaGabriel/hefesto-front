import { CommonModule, NgFor } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, inject, computed } from '@angular/core';
import { ChartDataService } from './mock-chart-data.service';

@Component({
  selector: 'app-metric-chart',
  standalone: true,
  templateUrl: './metric-chart.component.html',
  imports: [CommonModule, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricChartComponent {
  width = 500;
  height = 300;

  @Input() xLabels: string[] = [];
  @Input() yLabels: string[] = [];
  @Input() minValue = 20;
  @Input() maxValue = 50;



  readonly dataService = inject(ChartDataService);
  readonly data = this.dataService.data;

  get yMin(): number {
    return 300 - this.minValue * 3;
  }

  get yMax(): number {
    return 300 - this.maxValue * 3;
  }

  get heightRange(): number {
    return this.yMin - this.yMax;
  }

  get yLines() {
    return Array.from({ length: 11 }, (_, i) => i * (this.height / 10));
  }

  get xLines() {
    const values = this.data();
    return Array.from({ length: values.length }, (_, i) => i * (this.width / values.length));
  }

  get curveLine() {
    const values = this.data();
    const scaleX = this.width / (values.length - 1);
    const scaleY = this.height / 100;

    const points = values.map((val, i) => {
      const x = i * scaleX;
      const y = this.height - val * scaleY;
      return { x, y };
    });

    if (points.length < 2) return '';

    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const cx = (p0.x + p1.x) / 2;
      d += ` Q ${p0.x},${p0.y} ${cx},${(p0.y + p1.y) / 2}`;
      d += ` T ${p1.x},${p1.y}`;
    }

    return d;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
