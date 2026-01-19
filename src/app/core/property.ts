import { signal, WritableSignal } from '@angular/core';

export class QProperty<T> {

  private readonly _signal: WritableSignal<T>;

  constructor(initial: T) {
    this._signal = signal(initial);
  }

  get value(): T {
    return this._signal();
  }

  set value(v: T) {
    this._signal.set(v);
  }

  update(fn: (v: T) => T) {
    this._signal.update(fn);
  }

  asSignal() {
    return this._signal;
  }
}
