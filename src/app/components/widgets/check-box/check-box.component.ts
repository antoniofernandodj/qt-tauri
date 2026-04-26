import {
  Component,
  Input,
  HostBinding
} from '@angular/core';
import { QProperty } from '../../../core/property';

export type CheckState = 'unchecked' | 'checked' | 'partial';

/**
 * @component QCheckBox
 * @description
 * Um widget que oferece uma opção do tipo "liga/desliga" ou um estado de seleção múltipla.
 * Equivalente ao QCheckBox do Qt.
 *
 * @purpose
 * Permitir que o usuário faça escolhas binárias (sim/não) ou selecione múltiplos itens em uma lista,
 * com suporte opcional para um terceiro estado "parcial" (tristate).
 *
 * @solves
 * - **Estados Ambíguos**: O suporte a `tristate` resolve a necessidade de indicar seleções parciais em árvores de arquivos ou listas de permissões.
 * - **Sincronização reativa**: Integra-se ao `QProperty` para refletir mudanças de estado instantaneamente em outros componentes vinculados.
 * - **Acessibilidade Visual**: Mantém o estilo visual consistente do Qt Fusion para indicadores de seleção.
 *
 * @usage
 * ```html
 * <!-- Uso básico -->
 * <QCheckBox label="Lembrar Senha" [model]="rememberMe"></QCheckBox>
 *
 * <!-- Com estado parcial (Tristate) -->
 * <QCheckBox label="Selecionar Todos" [tristate]="true" [model]="selectAll"></QCheckBox>
 * ```
 *
 * @prop {string} label - O texto exibido ao lado da caixa de seleção.
 * @prop {boolean} disabled - Se verdadeiro, desabilita a interação com o widget.
 * @prop {boolean} tristate - Se verdadeiro, permite o estado "parcial" (null no modelo).
 * @prop {QProperty<boolean | null>} model - Propriedade reativa que armazena o estado: true (checked), false (unchecked), null (partial).
 */
@Component({
  selector: 'QCheckBox',
  standalone: true,
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent {

  @Input() label = '';
  @Input() disabled = false;
  @Input() tristate = false;

  /** Qt-like binding */
  @Input({ required: false })
  model: QProperty<boolean | null> = new QProperty(false)

  /* =========================
     State mapping
     ========================= */

  get state(): CheckState {
    const v = this.model.value;
    if (v === true) return 'checked';
    if (v === false) return 'unchecked';
    return 'partial';
  }

  set state(s: CheckState) {
    this.model.value =
      s === 'checked'
        ? true
        : s === 'unchecked'
        ? false
        : null;
  }

  /* =========================
     Interaction
     ========================= */

  toggle(): void {
    if (this.disabled) return;

    if (this.tristate) {
      this.state =
        this.state === 'unchecked'
          ? 'partial'
          : this.state === 'partial'
          ? 'checked'
          : 'unchecked';
    } else {
      this.state =
        this.state === 'checked'
          ? 'unchecked'
          : 'checked';
    }
  }

  /* =========================
     Host bindings
     ========================= */

  @HostBinding('class.qt-disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }

  @HostBinding('class.qt-checked')
  get isChecked(): boolean {
    return this.state === 'checked';
  }

  @HostBinding('class.qt-partial')
  get isPartial(): boolean {
    return this.state === 'partial';
  }
}
