import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

export type ButtonKind = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'success';

/**
 * @component QPushButton
 * @description
 * O botão de comando padrão do toolkit. Equivalente ao QPushButton do Qt.
 * Suporta estados visuais de hover, pressionado e desabilitado, além de variantes de estilo.
 *
 * @purpose
 * Fornecer uma interface clara para ações do usuário. Diferente de um link,
 * o QPushButton é semanticamente uma ação de "comando" que altera o estado da aplicação.
 *
 * @solves
 * - **Feedback Visual**: Garante que o usuário saiba exatamente quando o botão foi clicado ou se está inativo.
 * - **Padronização de Estilo**: Centraliza as cores de sistema (primary, destructive, etc) para evitar botões de tamanhos e cores diferentes.
 * - **Estados Complexos**: Gerencia nativamente a classe `.qt-checked` quando usado dentro de um QButtonGroup para criar toggles.
 *
 * @usage
 * ```html
 * <!-- Botão Padrão -->
 * <QPushButton text="OK" (clicked)="onOk()"></QPushButton>
 *
 * <!-- Botão de Destaque -->
 * <QPushButton text="Salvar" kind="primary"></QPushButton>
 *
 * <!-- Botão de Perigo -->
 * <QPushButton text="Deletar" kind="destructive"></QPushButton>
 * ```
 *
 * @prop {string} text - O rótulo visível do botão.
 * @prop {ButtonKind} kind - O estilo visual: 'primary' (destaque), 'secondary' (padrão), 'ghost' (sem borda), 'destructive' (vermelho).
 * @prop {boolean} disabled - Se verdadeiro, o botão ignora cliques e fica cinza.
 * @emit {MouseEvent} clicked - Disparado quando o botão é pressionado (apenas se não estiver desabilitado).
 */
@Component({
  selector: 'QPushButton',
  standalone: true,
  templateUrl: './push-button.component.html',
  styleUrls: ['./push-button.component.css']
})
export class PushButtonComponent {
  @Input() text: string = '';
  @Input() kind: ButtonKind = 'secondary';
  @Input() disabled = false;
  @Input() spacing: number = 2;
  @Output() clicked = new EventEmitter<MouseEvent>();

  // Estados visuais
  isHover = false;
  isPressed = false;
  
  // Estado checked (usado pelo ButtonGroup)
  isChecked = false;
  
  // Flag para indicar que está dentro de um ButtonGroup
  inButtonGroup = false;

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }

  @HostBinding('class.qt-checked')
  get checkedClass(): boolean {
    return this.isChecked;
  }

  @HostBinding('class.qt-in-group')
  get inGroupClass(): boolean {
    return this.inButtonGroup;
  }
}