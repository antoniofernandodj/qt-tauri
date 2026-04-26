import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @component QCommandLinkButton
 * @description
 * Um botão especializado que combina um título principal, uma descrição detalhada e um ícone.
 * Equivalente ao QCommandLinkButton do Qt.
 *
 * @purpose
 * Utilizado principalmente em assistentes (wizards) e diálogos de configuração para apresentar
 * opções complexas de forma clara, onde um simples botão com texto curto seria insuficiente.
 *
 * @solves
 * - **Clareza de Intenção**: Permite explicar o que cada ação faz diretamente no botão através da `description`.
 * - **Hierarquia Visual**: O título em destaque ajuda o usuário a escanear rapidamente as opções disponíveis.
 * - **Navegação Intuitiva**: O ícone padrão (geralmente uma seta) reforça a ideia de que a ação levará a um próximo passo.
 *
 * @usage
 * ```html
 * <QCommandLinkButton
 *   text="Instalar Software"
 *   description="Inicia o processo de instalação no diretório padrão."
 *   (clicked)="startInstall()">
 * </QCommandLinkButton>
 * ```
 *
 * @prop {string} text - O título principal do botão.
 * @prop {string} description - O texto descritivo exibido abaixo do título.
 * @prop {string} icon - Caminho para o ícone (opcional).
 * @prop {boolean} flat - Se verdadeiro, remove bordas e fundo até que o mouse passe por cima.
 * @prop {boolean} disabled - Se verdadeiro, desabilita interações e altera a opacidade.
 * @emit {MouseEvent} clicked - Disparado quando o botão é clicado e não está desabilitado.
 */
@Component({
  selector: 'QCommandLinkButton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './command-link-button.component.html',
  styleUrl: './command-link-button.component.css'
})
export class CommandLinkButtonComponent {
  /** The main title of the button */
  @Input() text: string = '';
  
  /** The descriptive text below the title */
  @Input() description: string = '';
  
  /** Icon path or name. Defaults to a right arrow if not provided. */
  @Input() icon: string = '';
  
  /** If true, the button has no border or background until hovered. */
  @Input() flat: boolean = false;
  
  @Input() disabled: boolean = false;

  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }

  @HostBinding('class.qt-flat')
  get isFlat(): boolean {
    return this.flat;
  }

  @HostBinding('class.qt-disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }
}
