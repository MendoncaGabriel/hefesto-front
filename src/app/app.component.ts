import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardLineComponent } from "./card-line/card-line.component";
import { MetricIndicatorComponent } from "./metric-indicator/metric-indicator.component";
import { MetricChartComponent } from "./metric-chart/metric-chart.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardLineComponent, MetricIndicatorComponent, MetricChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hefesto-front';
}
