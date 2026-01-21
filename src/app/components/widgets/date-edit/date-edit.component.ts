import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { QProperty } from '../../../core/property';

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
