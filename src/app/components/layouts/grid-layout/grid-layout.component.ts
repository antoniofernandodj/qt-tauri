import { Component, Input } from '@angular/core';

/**
 * @component QGridLayout
 * @description
 * Um gerenciador de layout que organiza widgets em uma grade bidimensional (linhas e colunas).
 * Equivalente ao QGridLayout do Qt.
 *
 * @purpose
 * Facilitar a criação de interfaces complexas que exigem alinhamento tanto vertical quanto horizontal
 * simultaneamente, como painéis de controle, dashboards ou grades de imagens.
 *
 * @solves
 * - **Alinhamento Multidimensional**: Resolve a dificuldade de alinhar elementos em múltiplas linhas e colunas sem usar tabelas HTML.
 * - **Uniformidade de Grid**: Garante que as colunas tenham larguras proporcionais (utilizando 1fr por padrão) e espaçamento consistente.
 * - **Complexidade de Layout**: Evita o aninhamento excessivo de HBox e VBox layouts.
 *
 * @usage
 * ```html
 * <QGridLayout [columns]="3" [spacing]="10">
 *   <QLabel text="Item 1"></QLabel>
 *   <QLabel text="Item 2"></QLabel>
 *   <QLabel text="Item 3"></QLabel>
 *   <QLabel text="Item 4"></QLabel>
 * </QGridLayout>
 * ```
 *
 * @prop {number} columns - O número de colunas na grade.
 * @prop {number} spacing - O espaço em pixels entre as células da grade (gap).
 * @prop {number} margin - Padding interno do container em pixels.
 */
@Component({
  selector: 'QGridLayout',
  styleUrls: [ './grid-layout.component.css' ],
  standalone: true,
  template: `
    <div
      class="qt-grid-layout"
      [style]="containerStyle">
      <ng-content></ng-content>
    </div>`,
})
export class GridLayoutComponent {

  @Input()
  columns = 2;

  @Input()
  spacing = 5;

  @Input()
  margin = 0;


  get containerStyle(): string {
    return `
      grid-template-columns: repeat(${this.columns}, 1fr);
      gap: ${this.spacing}px;
      padding: ${this.margin}px;
    `;
  }
}