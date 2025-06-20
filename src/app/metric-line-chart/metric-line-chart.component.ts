import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-metric-line-chart',
  templateUrl: './metric-line-chart.component.html',
  styleUrls: ['./metric-line-chart.component.css']
})
export class MetricLineChartComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() title = 'Metric Chart';
  @Input() labels: string[] = [];
  @Input() values: number[] = [];
  @Input() min = 0;
  @Input() max = 100;

  ngAfterViewInit(): void {
    this.drawChart();
  }

  private drawChart(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const padding = 0;
    const width = canvas.width;
    const height = canvas.height;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    ctx.clearRect(0, 0, width, height);

    // Title
    ctx.font = '16px Arial';
    ctx.fillText(this.title, padding, 30);

    // Axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Min/Max lines
    const yMax = padding;
    const yMin = height - padding;

    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, yMax);
    ctx.lineTo(width - padding, yMax);
    ctx.stroke();
    ctx.fillText('Máx', width - padding + 5, yMax + 5);

    ctx.beginPath();
    ctx.moveTo(padding, yMin);
    ctx.lineTo(width - padding, yMin);
    ctx.stroke();
    ctx.fillText('Mín', width - padding + 5, yMin + 5);
    ctx.setLineDash([]);

    // Line plot
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    this.values.forEach((val, i) => {
      const x = padding + (i / (this.values.length - 1)) * chartWidth;
      const y = yMin - ((val - this.min) / (this.max - this.min)) * chartHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // X labels
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    this.labels.forEach((label, i) => {
      const x = padding + (i / (this.labels.length - 1)) * chartWidth;
      ctx.fillText(label, x - 10, height - padding + 15);
    });
  }
}
