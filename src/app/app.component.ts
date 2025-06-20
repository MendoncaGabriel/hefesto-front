import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardLineComponent } from "./card-line/card-line.component";
import { MetricIndicatorComponent } from "./metric-indicator/metric-indicator.component";
import { MetricChartComponent } from "./metric-chart/metric-chart.component";

interface CardLine {
  title: string
  current: number
  max: number
}

interface MetricChart {
  legendaX: string[]
  legendaY: string[]
  minimo: number
  maximo: number
  title: string
  current: string
}

interface MetricIndicator {
  title: string;
  metric: string;
  alert?: boolean;
}

const mockMetricCharts: MetricChart[] = [
  {
    legendaX: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
    legendaY: ['0.00', '2.500', '5.00', '7.50', '10.00'],
    minimo: 55,
    maximo: 80,
    title: 'Pressure',
    current: '1.5 bar'
  },
  {
    legendaX: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
    legendaY: ['0.00', '62.5', '125.0', '187.5', '250.0'],
    minimo: 60,
    maximo: 90,
    title: 'Flow',
    current: '132 m³/h'
  },
  {
    legendaX: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
    legendaY: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
    minimo: 10,
    maximo: 50,
    title: 'Purity',
    current: '1500.0 ppm'
  },
  {
    legendaX: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
    legendaY: ['20.0', '27.0', '35.00', '42.5', '50.0'],
    minimo: 35,
    maximo: 45,
    title: 'Temperature',
    current: '15°C'
  }
];

const mockCardLines: CardLine[] = [
  {
    title: 'Jari',
    current: 1500,
    max: 3000,
  },
  {
    title: 'Jutai',
    current: 2600,
    max: 3000,
  },
  {
    title: 'Xingu',
    current: 1500,
    max: 3000,
  },
  {
    title: 'Negro',
    current: 2000,
    max: 3000,
  },
  {
    title: 'Line 2',
    current: 0,
    max: 3000,
  }
];

const metricIndicators: MetricIndicator[] = [
  {
    title: 'Pressure',
    metric: '1.5 bar'
  },
  {
    title: 'Flow',
    metric: '132 m³/h',
    alert: true
  },
  {
    title: 'Purity',
    metric: '1.5 ppm'
  },
  {
    title: 'Temperature',
    metric: '15°C'
  }
];


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardLineComponent, MetricIndicatorComponent, MetricChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hefesto-front';
  cardLines: CardLine[] = mockCardLines
  metricsChart: MetricChart[] = mockMetricCharts
  metricsIndicator: MetricIndicator[] = metricIndicators
}
