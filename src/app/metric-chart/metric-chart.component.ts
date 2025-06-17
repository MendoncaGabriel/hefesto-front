import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-metric-chart',
  templateUrl: './metric-chart.component.html',
  imports: [CommonModule, NgFor]
})
export class MetricChartComponent {
  largura = 500;
  altura = 300;

  dados = [10, 20, 15, 25, 30, 28, 40, 45, 35, 50];

  get linhasY() {
    return Array.from({ length: 11 }, (_, i) => i * (this.altura / 10));
  }

  get linhasX() {
    return Array.from({ length: 11 }, (_, i) => i * (this.largura / 10));
  }

  get linhaCurva() {
    const escalaX = this.largura / (this.dados.length - 1);
    const escalaY = this.altura / 100;

    const pontos = this.dados.map((valor, i) => {
      const x = i * escalaX;
      const y = this.altura - valor * escalaY;
      return { x, y };
    });

    if (pontos.length < 2) return '';

    let d = `M ${pontos[0].x},${pontos[0].y}`;
    for (let i = 1; i < pontos.length; i++) {
      const p0 = pontos[i - 1];
      const p1 = pontos[i];
      const cx = (p0.x + p1.x) / 2;
      d += ` Q ${p0.x},${p0.y} ${cx},${(p0.y + p1.y) / 2}`;
      d += ` T ${p1.x},${p1.y}`;
    }

    return d;
  }
}
