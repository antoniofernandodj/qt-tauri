// validators.ts
export type ValidatorFn<T = any> = (value: T) => string | null;

export type AsyncValidatorFn<T = any> = (value: T) => Promise<string | null>;

export interface ValidationState<T = any> {
  errors: string[];
  isValid: boolean;
  isDirty: boolean;  // foi modificado?
  isTouched: boolean; // foi focado/blurred?
}

export const Validators = {
  required: <T>(value: T) => 
    (value === null || value === undefined || value === '') ? 'Obrigatório' : null,

  minLength: (min: number): ValidatorFn<string> => 
    (value) => (value?.length < min ? `Mínimo ${min} caracteres` : null),

  pattern: (regex: RegExp, message: string): ValidatorFn<string> => 
    (value) => (value && !regex.test(value) ? message : null),

  email: ((value: string) => 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Email inválido'
  ),
  
  // Combinador de validadores
  compose: <T>(validators: ValidatorFn<T>[]): ValidatorFn<T> => 
    (value) => {
      const errors = validators.map(v => v(value)).filter(e => e !== null);
      return errors.length ? errors[0] : null; // Retorna primeiro erro
    }
};
