import { Component, Input, signal } from '@angular/core';
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-line',
  imports: [ProgressBarComponent, NgClass],
  templateUrl: './card-line.component.html',
  styleUrl: './card-line.component.css'
})
export class CardLineComponent {
  @Input() titleCard: string = "_"
  @Input() pulse: boolean = false;
}
