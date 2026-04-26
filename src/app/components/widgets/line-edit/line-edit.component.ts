import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QProperty } from '../../../core/property';

/**
 * @component QLineEdit
 * @description
 * Um editor de texto de linha única. Equivalente ao QLineEdit do Qt.
 * Suporta máscaras de entrada (implicitamente via HTML5), placeholders e modo senha.
 *
 * @purpose
 * Capturar dados curtos do usuário (nomes, senhas, números de telefone) com feedback imediato.
 *
 * @solves
 * - **Entrada de Texto Suja**: Permite limpar o campo rapidamente ou limitar o tamanho do texto via `maxLength`.
 * - **Exposição de Dados Sensíveis**: Resolve a necessidade de esconder caracteres em campos de senha via `isPassword`.
 * - **Reatividade Transparente**: Integra-se ao `QProperty` para atualizar o estado apenas no momento da digitação ou ao perder o foco (blur).
 *
 * @usage
 * ```html
 * <QLineEdit 
 *   [model]="state.username" 
 *   placeholder="Digite seu usuário"
 *   maxLength="20"
 * ></QLineEdit>
 * ```
 *
 * @prop {QProperty<string>} model - Binding de dados. O valor é atualizado em tempo real.
 * @prop {string} placeholder - Texto exibido quando o campo está vazio.
 * @prop {boolean} isPassword - Se verdadeiro, oculta os caracteres digitados.
 * @prop {boolean} readOnly - Permite seleção de texto mas impede edição.
 * @prop {boolean} disabled - Desabilita totalmente a interação.
 * @emit {string} textChanged - Disparado a cada tecla digitada.
 * @emit {void} editingFinished - Disparado quando o usuário pressiona Enter ou o campo perde o foco.
 */
@Component({
  selector: 'QLineEdit',
  standalone: true,
  templateUrl: './line-edit.component.html',
  styleUrls: ['./line-edit.component.css']
})
export class LineEditComponent {

  /* =========================
     Qt-like binding
     ========================= */

  @Input()
  startValue: string = ''

  @Input({ required: false })
  model: QProperty<string> = new QProperty(this.startValue);


  /* =========================
     Configuration
     ========================= */

  @Input() placeholder = '';
  @Input() readOnly = false;
  @Input() disabled = false;
  @Input() maxLength?: number;

  @Input() echoMode: 'normal' | 'password' | 'noecho' = 'normal';

  @Input() validator?: (value: string) => boolean;
  @Input() inputMask?: RegExp;
  @Input() marginTop: string | number = '0';
  @Input() marginBottom: string | number = '0';

  /* =========================
     Qt-like signals (sem estado)
     ========================= */

  @Output() textEdited = new EventEmitter<string>();
  @Output() editingFinished = new EventEmitter<void>();
  @Output() returnPressed = new EventEmitter<void>();

  private invalid = false;

  /* =========================
     Derived state
     ========================= */
     
  get inputType(): string {
    return this.echoMode === 'password' ? 'password' : 'text';
  }

  get displayValue(): string {
    if (this.echoMode === 'noecho') return '';
    return this.model.value;
  }

  /* =========================
     Interaction
     ========================= */

  onInput(event: Event): void {
    if (this.disabled || this.readOnly) return;

    const newValue = (event.target as HTMLInputElement).value;

    if (this.inputMask && !this.inputMask.test(newValue)) {
      return;
    }

    this.model.value = newValue;
    this.textEdited.emit(newValue);
  }

  onBlur(): void {
    if (this.validator && !this.validator(this.model.value)) {
      this.invalid = true;
      return;
    }

    this.invalid = false;
    this.editingFinished.emit();
  }

  onEnter(): void {
    this.returnPressed.emit();
  }
}
