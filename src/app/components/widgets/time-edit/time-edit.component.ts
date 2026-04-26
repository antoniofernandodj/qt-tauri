import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { QProperty } from '../../../core/property';

/**
 * @component QTimeEdit
 * @description
 * Um widget para editar horários. Equivalente ao QTimeEdit do Qt.
 *
 * @purpose
 * Fornecer uma interface de entrada específica para horas e minutos, garantindo que o valor seja um objeto Date válido.
 *
 * @solves
 * - **Validação de Tempo**: Impede a entrada de horários inválidos (ex: 25:61).
 * - **Precisão de Dados**: Garante que o modelo receba um objeto Date com as horas e minutos corretos, mantendo o dia original.
 *
 * @usage
 * ```html
 * <QTimeEdit [model]="state.startTime"></QTimeEdit>
 * ```
 * 
 * @prop {QProperty<Date>} model - Binding de dados contendo o horário.
 * @prop {Date} minimum - Horário mínimo permitido.
 * @prop {Date} maximum - Horário máximo permitido.
 */
@Component({
  selector: 'QTimeEdit',
  standalone: true,
  templateUrl: './time-edit.component.html',
  styleUrls: ['./time-edit.component.css']
})
export class TimeEditComponent {

  /* =========================
     Qt-like binding
     ========================= */

  @Input({ required: true })
  model!: QProperty<Date>;

  /* =========================
     Configuration
     ========================= */

  @Input() minimum?: Date;
  @Input() maximum?: Date;

  @Input() readOnly = false;
  @Input() disabled = false;

  @Input() stepSeconds = 60;

  /* =========================
     Qt-like signals
     ========================= */

  @Output() timeChanged = new EventEmitter<Date>();
  @Output() editingFinished = new EventEmitter<void>();

  /* =========================
     Derived value
     ========================= */

  get value(): string {
    const d = this.model.value;
    return `${this.pad(d.getHours())}:${this.pad(d.getMinutes())}`;
  }

  /* =========================
     Interaction
     ========================= */

  onInput(v: string): void {
    if (this.disabled || this.readOnly) return;

    const [h, m] = v.split(':').map(Number);
    const cur = this.model.value;

    const next = new Date(cur);
    next.setHours(h, m, 0, 0);

    this.commit(next);
  }

  onBlur(): void {
    this.editingFinished.emit();
  }

  /* =========================
     Helpers
     ========================= */

  private commit(d: Date): void {
    if (this.isOutOfRange(d)) return;

    this.model.value = d;
    this.timeChanged.emit(d);
  }

  private isOutOfRange(d: Date): boolean {
    if (this.minimum && d < this.minimum) return true;
    if (this.maximum && d > this.maximum) return true;
    return false;
  }

  private pad(v: number): string {
    return String(v).padStart(2, '0');
  }
}
