import { signal, WritableSignal } from "@angular/core";

export class QProperty<T> {

  private readonly _signal: WritableSignal<T>;
  private readonly _initial: T;

  constructor(initial: T) {
    this._initial = initial;
    this._signal = signal(initial);
  }

  get value(): T {
    return this._signal();
  }

  set value(v: T) {
    this._signal.set(v);
  }

  reset(): void {
    this._signal.set(this._initial);
  }

  asSignal() {
    return this._signal;
  }
}
