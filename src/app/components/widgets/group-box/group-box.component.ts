import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * @component QGroupBox
 * @description
 * Uma moldura com um título no topo para agrupar widgets logicamente relacionados.
 * Equivalente ao QGroupBox do Qt.
 *
 * @purpose
 * Melhorar a hierarquia visual e a organização de formulários complexos.
 * Permite que um conjunto de controles seja habilitado/desabilitado em massa.
 *
 * @solves
 * - **Poluição Visual**: Agrupa campos de formulário dispersos em seções nomeadas.
 * - **Controle de Seção**: O modo `checkable` permite que o usuário ative ou desative uma seção inteira de configurações de uma vez.
 * - **Consistência de Layout**: Mantém margens internas consistentes para todos os elementos agrupados.
 *
 * @usage
 * ```html
 * <QGroupBox title="Configurações de Rede" [checkable]="true" [(checked)]="isNetworkEnabled">
 *   <QVBoxLayout>
 *     <QLineEdit placeholder="IP Address"></QLineEdit>
 *     <QLineEdit placeholder="Gateway"></QLineEdit>
 *   </QVBoxLayout>
 * </QGroupBox>
 * ```
 *
 * @prop {string} title - O texto exibido na borda superior.
 * @prop {boolean} checkable - Se verdadeiro, exibe um checkbox ao lado do título.
 * @prop {boolean} checked - O estado do checkbox (se checkable=true). Desativa os filhos se falso.
 * @prop {number | string} flex - Proporção de crescimento no layout pai.
 */
@Component({
  selector: 'QGroupBox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <fieldset class="qt-groupbox" [disabled]="disabled">
      <legend class="qt-groupbox-legend">
        <input *ngIf="checkable" type="checkbox" [(ngModel)]="checked" class="qt-groupbox-check" [ngModelOptions]="{standalone: true}"/>
        {{ title }}
      </legend>
      <div class="qt-groupbox-content" [class.qt-disabled]="checkable && !checked">
        <ng-content></ng-content>
      </div>
    </fieldset>
  `,
  styles: [`
    :host { display: block; }

    .qt-groupbox {
      border: 1px solid var(--color-border-medium);
      border-radius: 3px;
      padding: 12px 10px 10px;
      margin: 0;
      min-width: 0;
    }

    .qt-groupbox-legend {
      font-size: var(--font-size-base);
      font-weight: 400;
      color: var(--color-text-primary);
      padding: 0 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .qt-groupbox-check {
      margin: 0;
      cursor: pointer;
      accent-color: var(--color-accent-primary);
    }

    .qt-groupbox-content.qt-disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  `]
})
export class GroupBoxComponent {
  @Input() title = '';
  @Input() disabled = false;
  @Input() checkable = false;
  @Input() checked = true;
  @Input() flex: number | string | null = null;

  @HostBinding('style.flex')
  get flexStyle() {
    return this.flex;
  }
}
