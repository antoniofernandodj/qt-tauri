import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

/**
 * @component QComboBox
 * @description
 * Um widget de seleção combinada que apresenta uma lista de opções ao usuário em um menu suspenso.
 * Equivalente ao QComboBox do Qt.
 *
 * @purpose
 * Economizar espaço na interface do usuário ao agrupar múltiplas opções em um único componente que se expande apenas quando necessário.
 *
 * @solves
 * - **Economia de Espaço**: Substitui grupos de radio buttons por uma única linha de texto e um botão de dropdown.
 * - **Validação de Entrada**: Garante que o usuário escolha apenas entre as opções pré-definidas na lista `items`.
 * - **Integração com Formulários**: Implementa `ControlValueAccessor` para funcionar nativamente com Reactive Forms do Angular.
 *
 * @usage
 * ```html
 * <!-- Uso com array de strings -->
 * <QComboBox [items]="['Opção 1', 'Opção 2', 'Opção 3']" [(ngModel)]="selectedOption"></QComboBox>
 * ```
 *
 * @prop {string[]} items - Lista de strings que serão exibidas como opções no menu suspenso.
 * @prop {boolean} disabled - Se verdadeiro, desabilita a abertura do menu e a seleção de itens.
 * @prop {number} currentIndex - O índice do item atualmente selecionado.
 * @prop {number} marginTop/Bottom/Left/Right - Margens externas para ajuste fino de layout.
 */
@Component({
  selector: 'QComboBox',
  standalone: true,
  templateUrl: './combo-box.component.html',
  styleUrl: './combo-box.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboBoxComponent),
      multi: true
    }
  ]
})
export class ComboBoxComponent implements ControlValueAccessor {

  @Input()
  items: string[] = [];

  @Input()
  disabled = false;

  open = false;

  @Input()
  marginTop: number = 1;

  @Input()
  marginBottom: number = 1;

  @Input()
  marginLeft: number = 1;

  @Input()
  marginRight: number = 1;

  @Input()
  currentIndex = -1;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  /* =========================
     ControlValueAccessor
     ========================= */

  writeValue(value: any): void {
    this.currentIndex = this.items.indexOf(value);
    this.cdr.detectChanges()
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.detectChanges()
  }

  /* =========================
     Interaction
     ========================= */

  toggle(): void {
    if (this.disabled) return;
    this.open = !this.open;
  }

  select(index: number): void {
    if (this.disabled) return;

    this.currentIndex = index;
    this.open = false;

    this.onChange(this.items[index]);
    this.onTouched();
  }

  get currentText(): string {
    return this.currentIndex >= 0
      ? this.items[this.currentIndex]
      : '';
  }

  @HostBinding('class.qt-disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }
}