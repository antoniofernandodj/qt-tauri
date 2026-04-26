import { effect, signal, WritableSignal } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { ValidatorFn, ValidationState } from "./validators";

/**
 * @class QProperty
 * @description
 * O átomo fundamental de reatividade do qt-tauri. Envolve um WritableSignal do Angular
 * para fornecer uma interface familiar a desenvolvedores Qt (get/set via .value).
 *
 * @purpose
 * Resolve a discrepância entre a reatividade baseada em Signals do Angular e o padrão
 * de propriedades do C++/Qt. Permite que estados sejam passados entre componentes
 * mantendo a ligação reativa sem a verbosidade de Observables ou a complexidade de Redux.
 *
 * @solves
 * - **Sincronização de Estado**: Garante que múltiplos widgets ligados à mesma propriedade se atualizem simultaneamente.
 * - **Resete de Formulários**: Possui o método `reset()` que retorna ao valor inicial de forma atômica.
 * - **Tipagem Estrita**: Usa Generics para garantir que o valor atribuído seja sempre do tipo esperado.
 *
 * @usage
 * ```ts
 * // No estado/serviço:
 * const age = new QProperty<number>(25);
 *
 * // Leitura/Escrita:
 * age.value = 26;
 * console.log(age.value);
 *
 * // No template:
 * <QSpinBox [model]="age" />
 * ```
 */
export class QPropertyBase<T> {

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

  get changes(): Observable<T> {
    return new Observable(observer => {
      const e = effect(() => observer.next(this.value));
      return () => e.destroy();
    });
  }
  
}


// B. Adicionar suporte a propriedades computadas
class QComputed<T> {
  constructor(private readonly _compute: () => T) {}
  get value(): T { return this._compute(); }
  // C. Adicionar operador de mudança (change$) para integração com RxJS se necessário
  get changes(): Observable<T> {
    return new Observable(observer => {
      const e = effect(() => observer.next(this.value));
      return () => e.destroy();
    });
  }
}






export class QProperty<T> extends QPropertyBase<T> {
  private _validators: ValidatorFn<T>[] = [];
  private _errors: string[] = [];
  private _isTouched = false;
  private _isDirty = false;

  constructor(initial: T, validators: ValidatorFn<T>[] = []) {
    super(initial);
    this._validators = validators;
    this._validate(); // Valida o valor inicial
  }

  override get value(): T {
    return super.value;
  }

  override set value(v: T) {
    const old = this.value;
    super.value = v;
    this._isDirty = v !== old;
    this._validate();
  }

  markAsTouched(): void { this._isTouched = true; }

  private _validate(): void {
    const error = this._validators
      .map(fn => fn(this.value))
      .filter((msg): msg is string => msg !== null);
    
    this._errors = error;
  }

  get validation(): ValidationState<T> {
    return {
      errors: this._errors,
      isValid: this._errors.length === 0,
      isDirty: this._isDirty,
      isTouched: this._isTouched
    };
  }

  get error(): string | null {
    return this._errors[0] ?? null;
  }

  override reset(): void {
    super.reset();
    this._isDirty = false;
    this._isTouched = false;
    this._validate();
  }
}