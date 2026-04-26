import { QProperty } from "./property";

/**
 * @class QObjectState
 * @description
 * Classe base para gerenciar coleções de QProperties. 
 * Inspirado no QObject do Qt, mas focado puramente em estado reativo.
 *
 * @purpose
 * Agrupar propriedades relacionadas (como campos de um formulário) e fornecer
 * métodos utilitários para resetar ou exportar esses dados de forma massiva.
 *
 * @solves
 * - **Gerenciamento de Boilerplate**: Resolve o problema de ter que resetar manualmente cada campo de um formulário.
 * - **Interoperabilidade**: Facilita a conversão do estado reativo da UI em objetos JS puros para envio via API (Tauri `invoke`).
 *
 * @usage
 * ```ts
 * class MyState extends QObjectState {
 *   name = new QProperty('');
 *   age = new QProperty(0);
 * }
 * 
 * const state = new MyState();
 * state.reset(); // Reseta ambos
 * const data = state.toObject(); // { name: '', age: 0 }
 * ```
 */
export class QObjectState {
    protected forEachProperty(fn: (p: QProperty<any>) => void): void {
      Object.values(this).forEach(v => {
        if (v instanceof QProperty) {
          fn(v);
        }
      });
    }
  
    protected mapProperties(
      fn: (p: QProperty<any>) => unknown
    ): Record<string, unknown> {
  
      const out: Record<string, unknown> = {};
      Object.entries(this).forEach(([key, v]) => {
        if (v instanceof QProperty) {
          out[key] = fn(v);
        }
      });
  
      return out;
    }

    reset(): void {
      this.forEachProperty(p => p.reset());
    }

    toObject(): Record<string, unknown> {
      return this.mapProperties(p => p.value);
    }

    get isValid(): boolean {
      let valid = true;
      this.forEachProperty(p => { if (!p.validation.isValid) valid = false; });
      return valid;
    }

    markAllAsTouched(): void {
      this.forEachProperty(p => p.markAsTouched());
    }

    errors(): Record<string, string | null> {
      const out: Record<string, string | null> = {};
      Object.entries(this).forEach(([key, v]) => {
        if (v instanceof QProperty) out[key] = v.error;
      });
      return out;
    }
  }