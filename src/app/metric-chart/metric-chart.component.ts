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

  private speedAnimation: number = 200;
  private maxVariante: number = 5; // variação da aleatoriedade
  private repeticoesRestantes = 10;
  private valorMinimo = 50;
  private valorMaximo = 70


  constructor() {
    this.iniciarAtualizacao();
  }

  iniciarAtualizacao() {
    const atualizar = () => {
      const dadosAtuais = this.dados();
      const ultimoValor = dadosAtuais[dadosAtuais.length - 1] ?? 100;

      let novoValor: number;

      if (this.repeticoesRestantes > 0) {
        novoValor = ultimoValor;
        this.repeticoesRestantes--;
      } else {
        novoValor = this.numeroAleatorio(ultimoValor);
        this.repeticoesRestantes = 3; // reinicia o contador
      }

      const novosDados = [...dadosAtuais.slice(1), novoValor];
      this.dados.set(novosDados);
      this.cdr.markForCheck();
      setTimeout(() => requestAnimationFrame(atualizar), this.speedAnimation);
    };

    requestAnimationFrame(atualizar);
  }


  numeroAleatorio(ultimoValor: number) {
    const variacao = Math.floor(Math.random() * (this.maxVariante * 2 + 1)) - this.maxVariante;
    const novoValor = Math.max(this.valorMinimo, Math.min(this.valorMaximo, ultimoValor + variacao));
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

