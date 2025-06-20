import { NgClass } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';

@Component({
  selector: 'app-metric-indicator',
  imports: [NgClass],
  templateUrl: './metric-indicator.component.html',
  styleUrl: './metric-indicator.component.css'
})
export class MetricIndicatorComponent {
  @Input() title: string = "";
  @Input() alert?: boolean = false;
  @Input() metric: string = "";

  pulse = computed(() => this.alert)
}
