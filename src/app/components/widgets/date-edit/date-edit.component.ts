import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { QProperty } from '../../../core/property';

/**
 * @component QDateEdit
 * @description
 * Um widget para edição de datas com base em um campo de texto formatado.
 * Equivalente ao QDateEdit do Qt.
 *
 * @purpose
 * Fornecer uma entrada de dados precisa para datas, permitindo a edição individual de ano, mês e dia,
 * com suporte a restrições de intervalo (mínimo/máximo).
 *
 * @solves
 * - **Validação de Data**: Impede a inserção de datas inválidas ou fora de um intervalo permitido através das propriedades `minimum` e `maximum`.
 * - **Sincronização reativa**: Garante que as mudanças no widget reflitam imediatamente no objeto de estado via `QProperty`.
 * - **Fluxo de Edição**: Fornece sinais claros (`dateChanged`, `editingFinished`) para que a aplicação possa reagir ao final da entrada de dados.
 *
 * @usage
 * ```html
 * <QDateEdit
 *   [model]="birthDate"
 *   [minimum]="minDate"
 *   [maximum]="maxDate"
 *   (dateChanged)="onDateUpdate($event)">
 * </QDateEdit>
 * ```
 *
 * @prop {QProperty<Date>} model - Propriedade reativa que armazena o objeto Date sendo editado.
 * @prop {Date} minimum - A data mínima permitida para seleção/edição.
 * @prop {Date} maximum - A data máxima permitida para seleção/edição.
 * @prop {boolean} readOnly - Se verdadeiro, o valor pode ser visto mas não alterado.
 * @prop {boolean} disabled - Se verdadeiro, desabilita a interação e altera a aparência visual.
 * @emit {Date} dateChanged - Disparado sempre que a data é alterada e validada.
 * @emit {void} editingFinished - Disparado quando o foco sai do widget (blur).
 */
@Component({
  selector: 'QDateEdit',
  standalone: true,
  templateUrl: './date-edit.component.html',
  styleUrls: ['./date-edit.component.css']
})
export class DateEditComponent {

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

  /* =========================
     Qt-like signals
     ========================= */

  @Output() dateChanged = new EventEmitter<Date>();
  @Output() editingFinished = new EventEmitter<void>();

  /* =========================
     Derived value
     ========================= */

  get value(): string {
    const d = this.model.value;
    return `${d.getFullYear()}-${this.pad(d.getMonth() + 1)}-${this.pad(d.getDate())}`;
  }

  /* =========================
     Interaction
     ========================= */

  onInput(v: string): void {
    if (this.disabled || this.readOnly) return;

    const [y, m, d] = v.split('-').map(Number);
    const cur = this.model.value;

    const next = new Date(cur);
    next.setFullYear(y, m - 1, d);

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
    this.dateChanged.emit(d);
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
