import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface ChartData {
  xLabels: string[];
  yLabels: string[];
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
        alert: "orange",
        current: 1600,
        max: 1600,
        chart: {
          xLabels: [
            '14:00', '14:10', '14:20', '14:30', '14:40', '14:50',
          ],
          yLabels: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
          data: [
            1000, 1200, 1300,
            1400, 1500, 1600,
            1000, 1200, 1300,
            1400,
            1000, 1200, 1300,
            1400, 1500, 1600,
            1000, 1200, 1300,
            1400,
            1000, 1200, 1300,
            1400, 1500, 1600,
            1000, 1200, 1300,
            1400,
            1000, 1200, 1300,
            1400, 1500, 1600,
            1000, 1200, 1300,
            1400,
            1000, 1200, 1300,
            1400, 1500, 1600,
            1000, 1200, 1300,
            1400,
            1000, 1200, 1300,
            1400, 1500, 1600,
            1000, 1200, 1300,
            1400,
            1000, 1200, 1300,
            1400, 1500, 1600,
            1000, 1200, 1300,
            1400,
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
          xLabels: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          yLabels: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
          data: [
            1000, 1000, 1000,
            1000, 1500, 1000
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
          xLabels: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          yLabels: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
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
          xLabels: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          yLabels: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
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
        alert: "orange",
        current: 1000,
        max: 1600,
        chart: {
          xLabels: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          yLabels: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
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
          xLabels: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          yLabels: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
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
          xLabels: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          yLabels: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
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
          xLabels: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          yLabels: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
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
          xLabels: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'],
          yLabels: ['0.00', '500.0', '1000.0', '1500.0', '2000.0'],
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
    setInterval(() => this.simulateSocket() ,2000);
  }

  private subject = new Subject<SoquetData>();

  getdata(): Observable<SoquetData>{
    return this.subject.asObservable()
  }

  mockOld: any = []

private simulateSocket() {
  if (this.mockOld.length === 0) {
    this.mockOld = JSON.parse(JSON.stringify(mockSoquet)); // garante cópia independente
  }

  // Usa o estado anterior
  const novoMock: SoquetData = JSON.parse(JSON.stringify(this.mockOld));

  novoMock.nitrogenGenerator = novoMock.nitrogenGenerator.map(metric => {
    const oldData = metric.chart.data;
    const oldXLabels = metric.chart.xLabels;

    // Move o último para o início
    oldData.unshift(oldData.pop()!);
    oldXLabels.unshift(oldXLabels.pop()!);

    // Atualiza valor atual
    metric.current = oldData[0];

    return metric;
  });

  // Atualiza mockOld com novo estado
  this.mockOld = JSON.parse(JSON.stringify(novoMock));

    this.subject.next(novoMock);
}

}
