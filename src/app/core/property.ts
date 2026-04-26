import { signal, WritableSignal } from "@angular/core";

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
