import { Component, Input, signal, effect, computed } from '@angular/core';
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-card-line',
  imports: [ProgressBarComponent, NgClass, CommonModule],
  templateUrl: './card-line.component.html',
  styleUrl: './card-line.component.css'
})
export class CardLineComponent {
  @Input() titleCard: string = "_"

  @Input() purityCurrent: number = 0;
  @Input() purityGoal: number = 100;

  @Input() pressureCurrent: number = 0;
  @Input() pressureGoal: number = 100;

  @Input() flowCurrent: number = 0;
  @Input() flowGoal: number = 100;

  alert = computed(() => {
    const progress = (this.purityCurrent / this.purityGoal) * 100;
    if (progress >= 65 || progress <= 75) {
      return true
    }

    return false
  })

  pulse = computed(() => {
    const progress = (this.purityCurrent / this.purityGoal) * 100;

    if (progress >= 75) {
      return true
    }

    return false
  });

  active = computed(() => {
    const purity = (this.purityCurrent / this.purityGoal) * 100;
    const pressure = (this.pressureCurrent / this.pressureGoal) * 100;
    const flow = (this.flowCurrent / this.flowGoal) * 100;

    if (purity > 0 || pressure > 0 || flow > 0) {
      return true
    }

    return false
  })
}
