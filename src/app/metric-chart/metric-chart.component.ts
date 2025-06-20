import { CommonModule, NgFor } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-metric-chart',
  standalone: true,
  templateUrl: './metric-chart.component.html',
  imports: [CommonModule, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricChartComponent {
  @Input() xLabels: string[] = [];
  @Input() yLabels: string[] = [];
  @Input() minValue = 20;
  @Input() maxValue = 50;
  @Input() current: number = 0;
  @Input() width: number = 500;
  @Input() height: number = 500;

  @Input() data: number[] = []; // Agora os dados vêm 100% via Input!

  get yMax(): number {
    return this.height - (this.maxValue - this.minLabel) * this.escalaYLabel;
  }

  get yMin(): number {
    return this.height - (this.minValue - this.minLabel) * this.escalaYLabel;
  }

  get escalaYLabel(): number {
    return this.height / (this.maxLabel - this.minLabel);
  }

  get heightRange(): number {
    return this.yMin - this.yMax;
  }

  get yLines() {
    if (this.yLabels.length > 1) {
      return Array.from({ length: this.yLabels.length }, (_, i) =>
        i * (this.height / (this.yLabels.length - 1))
      );
    }
    return [];
  }

  get escalaY(): number {
    return this.height / (this.maxLabel - this.minLabel);
  }

  get xLines() {
    if (this.xLabels.length > 1) {
      return Array.from({ length: this.xLabels.length }, (_, i) =>
        i * (this.width / (this.xLabels.length - 1))
      );
    }
    return [];
  }

  get minLabel(): number {
    return parseFloat(this.yLabels[0]) || 0;
  }

  get maxLabel(): number {
    return parseFloat(this.yLabels[this.yLabels.length - 1]) || 100;
  }

  get escalaYData(): number {
    return this.height / (this.maxValue - this.minValue);
  }

  get curveLine(): string {
    const values = this.data;
    if (!values || values.length < 2) return '';

    const scaleX = this.width / (values.length - 1);
    const escalaYRange = this.height / (this.maxLabel - this.minLabel);

    const points = values.map((val, i) => {
      const x = i * scaleX;
      const clampedVal = Math.min(Math.max(val, this.minValue), this.maxValue);
      const y = this.height - (clampedVal - this.minLabel) * escalaYRange;
      return { x, y };
    });

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
