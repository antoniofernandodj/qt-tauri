import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';
import { RadioGroupComponent } from '../radio-group/radio-group.component';

/**
 * @component QRadioButton
 * @description
 * Um botão de opção que permite ao usuário escolher uma única opção de um conjunto.
 * Equivalente ao QRadioButton do Qt.
 *
 * @purpose
 * Fornecer uma interface para seleção mútua exclusiva. Geralmente usado dentro de um QRadioGroup.
 *
 * @solves
 * - **Seleção Exclusiva**: Quando agrupado, garante que apenas uma opção seja selecionada por vez, disparando o desmarcar das outras automaticamente.
 * - **Feedback de Estado**: Mostra claramente qual opção está ativa através de um indicador visual circular.
 *
 * @usage
 * ```html
 * <QRadioGroup>
 *   <QRadioButton label="Opção A" value="a" [model]="state.choice"></QRadioButton>
 *   <QRadioButton label="Opção B" value="b" [model]="state.choice"></QRadioButton>
 * </QRadioGroup>
 * ```
 *
 * @prop {string} label - O texto exibido ao lado do botão.
 * @prop {any} value - O valor associado a esta opção.
 * @prop {QProperty<any>} model - Propriedade que armazena o valor selecionado do grupo.
 * @prop {boolean} disabled - Desabilita a interação.
 */
@Component({
  selector: 'QRadioButton',
  templateUrl: './radio-button.component.html',
  standalone: true,
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent {

  @Input()
  label: string = '';

  @Input()
  value: any = null;

  @Input()
  disabled: boolean = false;

  @Output()
  clicked = new EventEmitter<void>();

  @Output()
  toggled = new EventEmitter<boolean>();

  checked = false;
  private group?: RadioGroupComponent;

  get effectiveDisabled(): boolean {
    return this.disabled || !!this.group?.disabled;
  }

  registerGroup(group: RadioGroupComponent): void {
    this.group = group;
  }

  setChecked(state: boolean): void {
    this.checked = state;
  }

  onClick(): void {
    console.log(JSON.stringify({'this.effectiveDisabled': this.effectiveDisabled}));

    if (this.effectiveDisabled) return;
    if (this.checked) return;
    if (!this.group) return;

    this.group.select(this.value);

    this.clicked.emit();
    this.toggled.emit(true);
    alert(JSON.stringify(this.disabled))
  }

  @HostBinding('class.qt-disabled')
  get isDisabled(): boolean {
    return this.effectiveDisabled;
  }

  @HostBinding('class.qt-checked')
  get isChecked(): boolean {
    return this.checked;
  }
}
