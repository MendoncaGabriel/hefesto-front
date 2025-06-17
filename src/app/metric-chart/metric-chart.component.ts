import { CommonModule, NgFor } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-metric-chart',
  standalone: true,
  templateUrl: './metric-chart.component.html',
  imports: [CommonModule, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricChartComponent {
  largura = 500;
  altura = 300;
  dados = signal<number[]>(Array.from({ length: 30 }, () => 100));
  cdr = inject(ChangeDetectorRef);
  speedAnimation: number = 300

  constructor() {
    this.iniciarAtualizacao();
  }

  iniciarAtualizacao() {
    const atualizar = () => {
      const novosDados = [...this.dados().slice(1), this.numeroAleatorio()];
      this.dados.set(novosDados);
      this.cdr.markForCheck();
      setTimeout(() => requestAnimationFrame(atualizar), this.speedAnimation);
    };
    requestAnimationFrame(atualizar);
  }

  numeroAleatorio() {
    const dadosAtuais = this.dados();
    const ultimoValor = dadosAtuais[dadosAtuais.length - 1] ?? 100;
    const variacao = Math.floor(Math.random() * 21) - 10; // entre -10 e +10
    const novoValor = Math.max(0, Math.min(100, ultimoValor + variacao)); // mantém entre 0 e 100
    return novoValor;
  }

  get linhasY() {
    return Array.from({ length: 11 }, (_, i) => i * (this.altura / 10));
  }

  get linhasX() {
    const dados = this.dados();
    return Array.from({ length: dados.length }, (_, i) => i * (this.largura / dados.length));
  }

  get linhaCurva() {
    const dados = this.dados();
    const escalaX = this.largura / (dados.length - 1);
    const escalaY = this.altura / 100;

    const pontos = dados.map((valor, i) => {
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

  trackByIndex(index: number): number {
    return index;
  }
}
