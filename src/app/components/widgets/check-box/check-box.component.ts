import {
  Component,
  Input,
  HostBinding
} from '@angular/core';
import { QProperty } from '../../../core/property';

export type CheckState = 'unchecked' | 'checked' | 'partial';

@Component({
  selector: 'QCheckBox',
  standalone: true,
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent {

  @Input() label = '';
  @Input() disabled = false;
  @Input() tristate = false;

  /** Qt-like binding */
  @Input({ required: false })
  model: QProperty<boolean | null> = new QProperty(false)

  /* =========================
     State mapping
     ========================= */

  get state(): CheckState {
    const v = this.model.value;
    if (v === true) return 'checked';
    if (v === false) return 'unchecked';
    return 'partial';
  }

  set state(s: CheckState) {
    this.model.value =
      s === 'checked'
        ? true
        : s === 'unchecked'
        ? false
        : null;
  }

  /* =========================
     Interaction
     ========================= */

  toggle(): void {
    if (this.disabled) return;

    if (this.tristate) {
      this.state =
        this.state === 'unchecked'
          ? 'partial'
          : this.state === 'partial'
          ? 'checked'
          : 'unchecked';
    } else {
      this.state =
        this.state === 'checked'
          ? 'unchecked'
          : 'checked';
    }
  }

  /* =========================
     Host bindings
     ========================= */

  @HostBinding('class.qt-disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }

  @HostBinding('class.qt-checked')
  get isChecked(): boolean {
    return this.state === 'checked';
  }

  @HostBinding('class.qt-partial')
  get isPartial(): boolean {
    return this.state === 'partial';
  }
}
