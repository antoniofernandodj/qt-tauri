import { Component, Input } from '@angular/core';
import { QProperty } from '../../../core/property';

/**
 * @component QProgressBar
 * @description
 * Um widget que exibe o progresso de uma operação de longa duração.
 * Equivalente ao QProgressBar do Qt.
 *
 * @purpose
 * Fornecer feedback visual sobre a conclusão de uma tarefa, garantindo ao usuário que a aplicação está processando dados.
 *
 * @solves
 * - **Feedback de Status**: Resolve o problema de incerteza do usuário durante operações assíncronas ou de processamento intenso.
 * - **Representação de Intervalo**: Normaliza automaticamente valores entre um `minimum` e `maximum` para uma escala percentual.
 * - **Modo Indeterminado**: O suporte à propriedade `busy` permite indicar atividade mesmo quando o tempo total é desconhecido.
 *
 * @usage
 * ```html
 * <!-- Uso com modelo reativo -->
 * <QProgressBar [minimum]="0" [maximum]="100" [model]="downloadProgress"></QProgressBar>
 *
 * <!-- Modo ocupado (indeterminado) -->
 * <QProgressBar [busy]="true"></QProgressBar>
 * ```
 *
 * @prop {number} minimum - O valor mínimo da barra (padrão: 0).
 * @prop {number} maximum - O valor máximo da barra (padrão: 100).
 * @prop {QProperty<number>} model - Propriedade reativa que controla o valor atual.
 * @prop {number} value - Valor literal alternativo para uso sem QProperty.
 * @prop {boolean} showText - Se verdadeiro, exibe o percentual como texto dentro ou sobre a barra.
 * @prop {boolean} busy - Se verdadeiro, ativa a animação de estado indeterminado.
 */
@Component({
  selector: 'QProgressBar',
  standalone: true,
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {

  @Input() minimum = 0;
  @Input() maximum = 100;

  /** Qt-like binding */
  @Input() model?: QProperty<number>;

  /** fallback literal */
  @Input() value?: number;

  @Input() showText = true;
  @Input() busy = false;

  /** valor efetivo */
  get current(): number {
    if (this.model) {
      return this.model.value;
    }
    return this.value ?? this.minimum;
  }

  get percentage(): number {
    if (this.maximum <= this.minimum) return 0;

    const v = Math.min(
      this.maximum,
      Math.max(this.current, this.minimum)
    );

    return ((v - this.minimum) / (this.maximum - this.minimum)) * 100;
  }

  get text(): string {
    return `${Math.round(this.percentage)}%`;
  }

}
