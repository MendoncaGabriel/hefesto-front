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


  get current(): number {
    const values = this.data();
    return values[values.length - 1] ?? 0;
  }

  get curveLine() {
    const values = this.data();
    if (values.length < 2) return '';

    const scaleX = this.width / (values.length - 1);
    // Use escala Y baseada no range minValue -> maxValue, porém ajustado para a escala das labels
    // Para isso, criamos escala relativa dentro do intervalo das labels
    const escalaYRange = this.height / (this.maxLabel - this.minLabel);

    const points = values.map((val, i) => {
      const x = i * scaleX;

      // Clampe o valor para não sair do intervalo minValue/maxValue
      const clampedVal = Math.min(Math.max(val, this.minValue), this.maxValue);

      // Ajuste o y relativo ao clampedVal e as labels
      // Importante usar minLabel para alinhar com o eixo y do gráfico
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
