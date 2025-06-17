import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardLineComponent } from "./card-line/card-line.component";
import { MetricIndicatorComponent } from "./metric-indicator/metric-indicator.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardLineComponent, MetricIndicatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hefesto-front';
}
