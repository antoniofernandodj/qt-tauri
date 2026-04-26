import { Component, Input } from '@angular/core';

/**
 * @component QVBoxLayout
 * @description
 * Um gerenciador de layout que organiza widgets verticalmente em uma única coluna.
 * Equivalente ao QVBoxLayout do Qt.
 *
 * @purpose
 * Fornecer um sistema de alinhamento vertical previsível que respeita o fluxo de design
 * do Qt Fusion, onde o espaçamento entre elementos é fixo e controlado.
 *
 * @solves
 * - **Espaçamento Inconsistente**: Resolve o problema de usar margens manuais no CSS,centralizando o controle no input `spacing`.
 * - **Alinhamento de Cruzamento**: Permite esticar elementos para preencher a largura total ou alinhá-los ao centro/início de forma declarativa.
 * - **Distribuição de Espaço**: Quando usado dentro de outros layouts, permite controle de expansão via propriedade `flex`.
 *
 * @usage
 * ```html
 * <QVBoxLayout [spacing]="10" [margin]="15" align="stretch">
 *   <QLabel text="Nome:"></QLabel>
 *   <QLineEdit></QLineEdit>
 *   <QPushButton text="Salvar"></QPushButton>
 * </QVBoxLayout>
 * ```
 *
 * @prop {number} spacing - Espaço em pixels entre cada widget filho.
 * @prop {number} margin - Padding interno do container em pixels.
 * @prop {'start' | 'center' | 'end' | 'stretch'} align - Alinhamento horizontal dos filhos.
 * @prop {number} flex - Proporção de crescimento do layout em relação a outros elementos no container pai.
 */
@Component({
  selector: 'QVBoxLayout',
  standalone: true,
  template: '<div class="qt-vbox-layout" [style]="containerStyle"><ng-content></ng-content></div>',
  styleUrls: [ './vbox-layout.component.css' ]
})
export class VBoxLayoutComponent {
  @Input() spacing = 0;
  @Input() margin = 0;
  @Input() align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
  @Input() flex: number | null = null;

  get containerStyle(): string {
    let style = `gap: ${this.spacing}px; padding: ${this.margin}px;`;
    if (this.flex !== null) style += ` flex: ${this.flex};`;
    return style;
  }
}