import { NgClass } from '@angular/common';
import { Component, Input, signal, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
  imports: [NgClass]
})
export class ProgressBarComponent implements OnChanges {
  @Input() current: number = 0;
  @Input() goal: number = 100;
  @Input() title: string = "undefined";

  setColors = {
    "green": "to-green-600 from-green-500",
    "red": "to-red-600 from-red-500",
    "orange": "to-orange-600 from-orange-500",
  }
  setShadow = {
    "green": "shadow-green-600/50",
    "red": "shadow-red-600/50",
    "orange": "shadow-orange-600/50",
  }

  percentage = signal<number>(0);

  shadow = signal<string>(this.setShadow["green"]);
  color = signal<string>(this.setColors["green"]);

  ngOnChanges(changes: SimpleChanges): void {
    if (this.goal > 0) {
      const value = (this.current / this.goal) * 100;
      this.percentage.set(value);
    } else {
      this.percentage.set(0);
    }

    const currentPercentage = this.percentage();

    // change colors
    if(currentPercentage >= 75){
      this.color.set(this.setColors["red"])
      this.shadow.set(this.setShadow["red"])
    } 
    if(currentPercentage <= 50){
      this.color.set(this.setColors["green"])
      this.shadow.set(this.setShadow["green"])
    }
    if(currentPercentage > 65 && currentPercentage < 75){
      this.color.set(this.setColors["orange"])
      this.shadow.set(this.setShadow["orange"])
    }
  }
}
