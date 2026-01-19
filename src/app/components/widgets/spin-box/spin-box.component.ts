import {
  Component,
  HostBinding,
  Input
} from '@angular/core';
import { QProperty } from '../../../core/property';

@Component({
  selector: 'QSpinBox',
  standalone: true,
  templateUrl: './spin-box.component.html',
  styleUrls: ['./spin-box.component.css']
})
export class SpinBoxComponent {

  @Input({ required: true })
  model!: QProperty<number>;

  @Input()
  min = 0;

  @Input()
  max = 100;

  @Input()
  step = 1;

  @Input()
  disabled = false;

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
