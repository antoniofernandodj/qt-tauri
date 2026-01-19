import { Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';


export interface ActionOptions {
  text?: string;
  enabled?: boolean;
  checkable?: boolean;
  checked?: boolean;
  handler?: () => void;
}

export class Action {

  text = '';
  icon?: string;
  type?: string;

  enabled = true;
  checkable = false;
  checked = false;

  readonly triggered = new EventEmitter<void>();
  readonly toggled = new EventEmitter<boolean>();

  constructor(options?: ActionOptions) {
    if (!options) return;
    Object.assign(this, options);

    if (options.handler) {
      this.triggered.subscribe(options.handler);
    }
  }

  get title() {
    return this.text
  }

  trigger(): void {
    if (!this.enabled) return;

    if (this.checkable) {
      this.checked = !this.checked;
      this.toggled.emit(this.checked);
    }

    this.triggered.emit();
  }

  setChecked(value: boolean): void {
    if (!this.checkable) return;
    this.checked = value;
    this.toggled.emit(this.checked);
  }

  setEnabled(value: boolean): void {
    this.enabled = value;
  }
}
