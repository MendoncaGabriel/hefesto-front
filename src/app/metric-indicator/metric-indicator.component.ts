import { NgClass } from '@angular/common';
import { Component, computed, Input } from '@angular/core';

@Component({
  selector: 'app-metric-indicator',
  imports: [NgClass],
  templateUrl: './metric-indicator.component.html',
  styleUrl: './metric-indicator.component.css'
})
export class MetricIndicatorComponent {
  @Input() title: string = "";
  @Input() alert: "red" | 'orange' | 'none' = 'none';
  @Input() metric: number = 0;
  @Input() uom: string = "";
}
