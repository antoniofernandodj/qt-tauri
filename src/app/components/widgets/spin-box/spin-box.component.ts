import {
  Component,
  HostBinding,
  Input
} from '@angular/core';
import { QProperty } from '../../../core/property';

/**
 * @component QSpinBox
 * @description
 * Um widget que permite ao usuário escolher um valor inteiro clicando em botões de incremento/decremento ou digitando o valor.
 * Equivalente ao QSpinBox do Qt.
 *
 * @purpose
 * Fornecer entrada numérica precisa com limites controlados.
 *
 * @solves
 * - **Erros de Tipo**: Impede a entrada de caracteres não numéricos.
 * - **Fora de Intervalo**: Garante que o valor nunca ultrapasse os limites `min` e `max` definidos.
 * - **Facilidade de Uso**: Os botões Up/Down facilitam ajustes finos sem a necessidade de teclado.
 *
 * @usage
 * ```html
 * <QSpinBox 
 *   [min]="1" 
 *   [max]="10" 
 *   prefix="Item: "
 *   [model]="state.quantity"
 * ></QSpinBox>
 * ```
 *
 * @prop {QProperty<number>} model - Binding do valor numérico.
 * @prop {number} min - Valor mínimo.
 * @prop {number} max - Valor máximo.
 * @prop {number} step - Quantidade a somar/subtrair a cada clique.
 * @prop {string} prefix - Texto fixo antes do número.
 * @prop {string} suffix - Texto fixo depois do número (ex: " px").
 * @emit {number} valueChanged - Disparado quando o valor é alterado.
 */
@Component({
  selector: 'QSpinBox',
  standalone: true,
  templateUrl: './spin-box.component.html',
  styleUrls: ['./spin-box.component.css']
})
export class SpinBoxComponent {

  
  @Input()
  min = 0;

  @Input()
  startValue = 0;

  @Input()
  max = 100;

  @Input()
  step = 1;
  
  @Input()
  disabled = false;
  
  @Input({ required: false })
  model: QProperty<number> = new QProperty(this.startValue);

  @Input()
  marginLeft: string | number = '0';

  @Input()
  marginRight: string | number = '0';

  /* =========================
     Value proxy
     ========================= */

  get value(): number {
    return this.model.value;
  }

  set value(v: number) {
    this.model.value = this.clamp(v);
  }

  /* =========================
     Behavior
     ========================= */

  increment(): void {
    if (this.disabled) return;
    this.value += this.step;
  }

  decrement(): void {
    if (this.disabled) return;
    this.value -= this.step;
  }

  onInput(event: Event): void {
    const v = Number(
      (event.target as HTMLInputElement).value
    );
    if (!Number.isNaN(v)) {
      this.value = v;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.increment();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.decrement();
    }
  }

  onBlur(): void {
    // Qt-like hook (editingFinished)
  }

  private clamp(v: number): number {
    return Math.min(this.max, Math.max(this.min, v));
  }

  /* =========================
     Host bindings
     ========================= */

  @HostBinding('class.qt-disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }
}
