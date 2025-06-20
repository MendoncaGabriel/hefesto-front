import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OvenMetrics } from "./oven-metrics/oven-metrics.component";
import { MetricIndicatorComponent } from "./metric-indicator/metric-indicator.component";
import { MetricChartComponent } from "./metric-chart/metric-chart.component";
import { GlobalService } from './global.service';

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


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OvenMetrics, MetricIndicatorComponent, MetricChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    readonly globalService: GlobalService
  ){


    globalService.getdata()
    .subscribe(data => {
      console.log(data)
    })

  }



  title = 'hefesto-front';
  cardLines: CardLine[] = []
  metricsChart: MetricChart[] = []
  metricsIndicator: MetricIndicator[] = []
}
