import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';
import { RadioGroupComponent } from '../radio-group/radio-group.component';

@Component({
  selector: 'QRadioButton',
  templateUrl: './radio-button.component.html',
  standalone: true,
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent {

  @Input() label: string = '';
  @Input() value: any = null;
  @Input() disabled: boolean = false;

  @Output() clicked = new EventEmitter<void>();
  @Output() toggled = new EventEmitter<boolean>();

  checked = false;
  private group?: RadioGroupComponent;

  registerGroup(group: RadioGroupComponent): void {
    this.group = group;
  }

  setChecked(state: boolean): void {
    this.checked = state;
  }

  onClick(): void {
    if (this.disabled || this.checked || !this.group) {
      return;
    }

    this.group.select(this.value);

    this.clicked.emit();
    this.toggled.emit(true);
  }

  @HostBinding('class.qt-disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }

  @HostBinding('class.qt-checked')
  get isChecked(): boolean {
    return this.checked;
  }
}
