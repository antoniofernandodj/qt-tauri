import { QProperty } from "./property";

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
  }