import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChartDataService {
  private readonly minValue = 20;
  private readonly maxValue = 50;
  private readonly maxVariation = computed(() => this.maxValue - this.minValue);
  private remainingRepeats = 10;

  private readonly _data = signal<number[]>(Array.from({ length: 30 }, () => 100));
  public readonly data = this._data.asReadonly();

  private readonly speed = 200;

  constructor() {
    this.start();
  }

  private start() {
    const update = () => {
      const current = this._data();
      const last = current[current.length - 1] ?? 100;

      let newValue: number;

      if (this.remainingRepeats > 0) {
        newValue = last;
        this.remainingRepeats--;
      } else {
        newValue = this.randomNumber(last);
        this.remainingRepeats = 3;
      }

      const updated = [...current.slice(1), newValue];
      this._data.set(updated);

      setTimeout(() => requestAnimationFrame(update), this.speed);
    };

    requestAnimationFrame(update);
  }

  private randomNumber(last: number) {
    const variation = Math.floor(Math.random() * (this.maxVariation() * 2 + 1)) - this.maxVariation();
    return Math.max(this.minValue, Math.min(this.maxValue, last + variation));
  }
}
