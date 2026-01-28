import { Component, Input, HostBinding } from '@angular/core';
import { QProperty } from '../../../core/property';

@Component({
  selector: 'QTextEdit',
  standalone: true,
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.css']
})
export class TextEditComponent {

  @Input({ required: false })
  model: QProperty<string> = new QProperty('');

  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() rows = 4;

  /* =========================
     Value proxy
     ========================= */

  get value(): string {
    return this.model.value;
  }

  set value(v: string) {
    this.model.value = v;
  }

  @HostBinding('class.qt-disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }
}
