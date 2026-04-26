import { Component, Input, HostBinding, ElementRef } from '@angular/core';
import { QProperty } from '../../../core/property';

/**
 * @component QDial
 * @description
 * Um controle de discagem arredondado (knob) para seleção de valores numéricos em um intervalo.
 * Equivalente ao QDial do Qt.
 *
 * @purpose
 * Fornecer uma alternativa visual e compacta aos sliders tradicionais, ideal para interfaces de áudio,
 * simulação física ou situações onde o espaço vertical/horizontal é limitado.
 *
 * @solves
 * - **Economia de Espaço**: Ocupa uma área quadrada fixa, independente do intervalo de valores.
 * - **Interação Intuitiva**: Mimetiza o comportamento de potenciômetros físicos, facilitando o ajuste rápido de parâmetros.
 * - **Feedback Visual Imediato**: O indicador rotativo fornece uma noção clara da posição relativa do valor no intervalo total.
 *
 * @usage
 * ```html
 * <QDialEdit [min]="0" [max]="100" [model]="volumeProperty"></QDialEdit>
 * ```
 *
 * @prop {number} min - O valor mínimo do intervalo (padrão: 0).
 * @prop {number} max - O valor máximo do intervalo (padrão: 100).
 * @prop {QProperty<number>} model - Propriedade reativa que armazena e sincroniza o valor numérico.
 */
@Component({
  selector: 'QDialEdit',
  standalone: true,
  template: `
    <div class="qt-dial" (mousedown)="onMouseDown($event)">
      <div class="qt-dial-track">
        <div class="qt-dial-knob" [style.transform]="'rotate(' + angle + 'deg)'">
          <div class="qt-dial-indicator"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: inline-flex; user-select: none; }

    .qt-dial {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .qt-dial-track {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, var(--color-bg-hover), var(--color-bg-tertiary));
      border: 1px solid var(--color-border-dark);
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .qt-dial-knob {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 4px;
    }

    .qt-dial-indicator {
      width: 3px;
      height: 10px;
      background-color: var(--color-accent-primary);
      border-radius: 2px;
    }
  `]
})
export class DialEditComponent {
  @Input() min = 0;
  @Input() max = 100;
  @Input() model: QProperty<number> = new QProperty(0);

  get angle(): number {
    const pct = (this.model.value - this.min) / (this.max - this.min);
    return -135 + pct * 270;
  }

  onMouseDown(e: MouseEvent): void {
    const move = (ev: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('.qt-dial') as HTMLElement;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const deg = Math.atan2(ev.clientY - cy, ev.clientX - cx) * (180 / Math.PI) + 90;
      const clamped = Math.max(-135, Math.min(135, deg));
      const pct = (clamped + 135) / 270;
      this.model.value = Math.round(this.min + pct * (this.max - this.min));
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  }
}
