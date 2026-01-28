import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input
} from '@angular/core';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { QProperty } from '../../../core/property';

@Component({
  selector: 'QRadioGroup',
  template: `<ng-content></ng-content>`,
  standalone: true
})
export class RadioGroupComponent implements AfterContentInit {

  /* =========================
     Qt-like binding
     ========================= */

  @Input({ required: false })
  model: QProperty<any> = new QProperty('RadioGroup');

  @Input() disabled = false;

  @ContentChildren(RadioButtonComponent)
  radios!: QueryList<RadioButtonComponent>;

  ngAfterContentInit(): void {
    this.radios.forEach(radio => {
      radio.registerGroup(this);
    });

    this.syncState();
  }

  /* =========================
     Called by buttons
     ========================= */

  select(value: any): void {
    if (this.disabled) return;

    this.model.value = value;
    this.syncState();
  }

  /* =========================
     Internal
     ========================= */

  private syncState(): void {
    if (!this.radios) return;

    const current = this.model.value;
    this.radios.forEach(radio =>
      radio.setChecked(radio.value === current)
    );
  }
}
