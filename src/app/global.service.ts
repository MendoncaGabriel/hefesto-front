import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface ChartData {
  legendaX: string[];
  legendaY: string[];
  data: number[];
}

export interface BaseMetric {
  title: string;
  current: number;
  max: number;
  chart: ChartData;
  alert: "red" | 'orange' | 'none';
  uom: string;
}


export interface SoquetData {
  oven: BaseMetric[];
  nitrogenGenerator: BaseMetric[];
}


const mockSoquet: SoquetData  = {
    nitrogenGenerator: [
      {
        title: "Pressure",
        uom: "bar",
        alert: "none",
        current: 1000,
        max: 1600,
        chart: {
          legendaX: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          legendaY: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
          data: [
            1000, 1200, 1400,
            1500, 1200, 1000
          ]
        }
      },
      {
        title: "Flow",
        alert: "none",
        uom: "m³/h",
        current: 1000,
        max: 1600,
        chart: {
          legendaX: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          legendaY: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
          data: [
            1000, 1200, 1400,
            1500, 1200, 1000
          ]
        }
      },
      {
        title: "Purity",
        uom: "ppm",
        alert: "none",
        current: 1000,
        max: 1600,
        chart: {
          legendaX: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          legendaY: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
          data: [
            1000, 1200, 1400,
            1500, 1200, 1000
          ]
        }
      },
      {
        title: "Temperature",
        uom: "ºC",
        alert: "none",
        current: 1000,
        max: 1600,
        chart: {
          legendaX: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          legendaY: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
          data: [
            1000, 1200, 1400,
            1500, 1200, 1000
          ]
        }
      },
    ],
    oven: [
      {
        title: "Jari",
        uom: "ppm",
        alert: "none",
        current: 1000,
        max: 1600,
        chart: {
          legendaX: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          legendaY: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
          data: [
            1000, 1200, 1400,
            1500, 1200, 1000
          ]
        }
      },
      {
        title: "Jutai",
        current: 1000,
        alert: "none",
        uom: "ppm",
        max: 1600,
        chart: {
          legendaX: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          legendaY: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
          data: [
            1000, 1200, 1400,
            1500, 1200, 1000
          ]
        }
      },
      {
        title: "Xingu",
        uom: "ppm",
        current: 1000,
        alert: "none",
        max: 1600,
        chart: {
          legendaX: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          legendaY: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
          data: [
            1000, 1200, 1400,
            1500, 1200, 1000
          ]
        }
      },
      {
        title: "Negro",
        uom: "ppm",
        current: 1000,
        alert: "none",
        max: 1600,
        chart: {
          legendaX: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          legendaY: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
          data: [
            1000, 1200, 1400,
            1500, 1200, 1000
          ]
        }
      },
      {
        title: "Line 2",
        uom: "ppm",
        current: 1000,
        alert: "none",
        max: 1600,
        chart: {
          legendaX: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          legendaY: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
          data: [
            1000, 1200, 1400,
            1500, 1200, 1000
          ]
        }
      },
    ]
}

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() {
    setInterval(() => this.simulateSocket() ,500);
  }

  private subject = new Subject<SoquetData>();

  getdata(): Observable<SoquetData>{
    return this.subject.asObservable()
  }

  private simulateSocket(){
    this.subject.next(mockSoquet)
  }
}
