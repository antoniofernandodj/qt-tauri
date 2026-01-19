import {
  ChangeDetectorRef,
  Component,
  Input,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'QComboBox',
  standalone: true,
  templateUrl: './combo-box.component.html',
  styleUrl: './combo-box.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboBoxComponent),
      multi: true
    }
  ]
})
export class ComboBoxComponent implements ControlValueAccessor {

  @Input() items: string[] = [];
  @Input() disabled = false;

  open = false;
  currentIndex = -1;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  /* =========================
     ControlValueAccessor
     ========================= */

  writeValue(value: any): void {
    this.currentIndex = this.items.indexOf(value);
    this.cdr.detectChanges()
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.detectChanges()
  }

  /* =========================
     Interaction
     ========================= */

  toggle(): void {
    if (this.disabled) return;
    this.open = !this.open;
  }

  select(index: number): void {
    if (this.disabled) return;

    this.currentIndex = index;
    this.open = false;

    this.onChange(this.items[index]);
    this.onTouched();
  }

  get currentText(): string {
    return this.currentIndex >= 0
      ? this.items[this.currentIndex]
      : '';
  }
}