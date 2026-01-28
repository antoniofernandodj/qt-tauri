import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QProperty } from '../../../core/property';

@Component({
  selector: 'QLineEdit',
  standalone: true,
  templateUrl: './line-edit.component.html',
  styleUrls: ['./line-edit.component.css']
})
export class LineEditComponent {

  /* =========================
     Qt-like binding
     ========================= */

  @Input()
  startValue: string = ''

  @Input({ required: false })
  model: QProperty<string> = new QProperty(this.startValue);


  /* =========================
     Configuration
     ========================= */

  @Input() placeholder = '';
  @Input() readOnly = false;
  @Input() disabled = false;
  @Input() maxLength?: number;

  @Input() echoMode: 'normal' | 'password' | 'noecho' = 'normal';

  @Input() validator?: (value: string) => boolean;
  @Input() inputMask?: RegExp;
  @Input() marginTop: string | number = '0';
  @Input() marginBottom: string | number = '0';

  /* =========================
     Qt-like signals (sem estado)
     ========================= */

  @Output() textEdited = new EventEmitter<string>();
  @Output() editingFinished = new EventEmitter<void>();
  @Output() returnPressed = new EventEmitter<void>();

  private invalid = false;

  /* =========================
     Derived state
     ========================= */
     
  get inputType(): string {
    return this.echoMode === 'password' ? 'password' : 'text';
  }

  get displayValue(): string {
    if (this.echoMode === 'noecho') return '';
    return this.model.value;
  }

  /* =========================
     Interaction
     ========================= */

  onInput(event: Event): void {
    if (this.disabled || this.readOnly) return;

    const newValue = (event.target as HTMLInputElement).value;

    if (this.inputMask && !this.inputMask.test(newValue)) {
      return;
    }

    this.model.value = newValue;
    this.textEdited.emit(newValue);
  }

  onBlur(): void {
    if (this.validator && !this.validator(this.model.value)) {
      this.invalid = true;
      return;
    }

    this.invalid = false;
    this.editingFinished.emit();
  }

  onEnter(): void {
    this.returnPressed.emit();
  }
}
