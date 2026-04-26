import { Component, Input } from '@angular/core';

/**
 * @component QHBoxLayout
 * @description
 * Um gerenciador de layout que organiza widgets horizontalmente em uma única linha.
 * Equivalente ao QHBoxLayout do Qt.
 *
 * @purpose
 * Fornecer um sistema de alinhamento horizontal previsível que respeita o fluxo de design
 * do Qt Fusion, onde o espaçamento entre elementos é fixo e controlado em um eixo X.
 *
 * @solves
 * - **Alinhamento Horizontal**: Simplifica a criação de barras de ferramentas, linhas de botões e formulários horizontais.
 * - **Gerenciamento de Espaço**: Controla o gap entre os elementos sem a necessidade de classes utilitárias de CSS.
 * - **Responsividade Interna**: Permite que os filhos se comportem de forma consistente (esticar ou centralizar) no eixo vertical (Y).
 *
 * @usage
 * ```html
 * <QHBoxLayout [spacing]="5" [margin]="10" align="center">
 *   <QPushButton text="Cancelar"></QPushButton>
 *   <QPushButton text="Aplicar" kind="primary"></QPushButton>
 * </QHBoxLayout>
 * ```
 *
 * @prop {number} spacing - Espaço em pixels entre cada widget filho.
 * @prop {number} margin - Padding interno do container em pixels.
 * @prop {'start' | 'center' | 'end' | 'stretch' | 'between'} align - Alinhamento dos itens no eixo transversal e distribuição no eixo principal.
 * @prop {string | number} width - Largura explícita do layout.
 * @prop {string | number} height - Altura explícita do layout.
 */
@Component({
  selector: 'QHBoxLayout',
  standalone: true,
  template: `
    <div
      class="qt-hbox-layout"
      [style]="containerStyle">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: [ './hbox-layout.component.css' ]
})
export class HBoxLayoutComponent {
  @Input() spacing = 0;
  @Input() margin = 0;
  @Input() align: 'start' | 'center' | 'end' | 'stretch' | 'between' = 'stretch';

  @Input() width?: string | number;
  @Input() height?: string | number;

  get containerStyle(): string {
    const justify = this.align === 'between' ? 'justify-content: space-between;' : '';
    const alignItems = this.align === 'between' ? 'center' : this.align;

    let style = `gap: ${this.spacing}px; padding: ${this.margin}px; align-items: ${alignItems}; ${justify}`;

    if (this.width !== undefined) {
      style += ` width: ${typeof this.width === 'number' ? this.width + 'px' : this.width};`;
    }

    if (this.height !== undefined) {
      style += ` height: ${typeof this.height === 'number' ? this.height + 'px' : this.height};`;
    }

    return style;
  }
}
