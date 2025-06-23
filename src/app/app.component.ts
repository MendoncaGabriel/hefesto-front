import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OvenMetrics } from "./oven-metrics/oven-metrics.component";
import { MetricIndicatorComponent } from "./metric-indicator/metric-indicator.component";
import { MetricChartComponent } from "./metric-chart/metric-chart.component";
import { BaseMetric, GlobalService } from './global.service';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OvenMetrics, MetricIndicatorComponent, MetricChartComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    readonly globalService: GlobalService
  ){

    globalService.getdata()
    .subscribe(data => {
      this.oven.set(data.oven)
      this.nitrogenGenerator.set(data.nitrogenGenerator)
    })
  }
  oven = signal<BaseMetric[]>([])
  nitrogenGenerator = signal<BaseMetric[]>([])
}
