import { Component, Input } from '@angular/core';

/**
 * @component QScrollArea
 * @description
 * Fornece uma visão rolável de outro widget. Equivalente ao QScrollArea do Qt.
 *
 * @purpose
 * Exibir conteúdos que são maiores que a área disponível na tela.
 *
 * @solves
 * - **Estouro de Conteúdo**: Impede que widgets grandes quebrem o layout, confinando-os a um container com barras de rolagem.
 * - **Layouts Dinâmicos**: Resolve a necessidade de áreas que crescem com o conteúdo sem afetar os elementos vizinhos.
 *
 * @usage
 * ```html
 * <QScrollArea style="height: 200px;">
 *    <large-content-widget />
 * </QScrollArea>
 * ```
 */
@Component({
  selector: 'QScrollArea',
  standalone: true,
  imports: [],
  templateUrl: './scroll-area.component.html',
  styleUrl: './scroll-area.component.css'
})
export class ScrollAreaComponent {

  @Input() horizontal = true;
  @Input() vertical = true;

  get overflowX(): string {
    return this.horizontal ? 'auto' : 'hidden';
  }

  get overflowY(): string {
    return this.vertical ? 'auto' : 'hidden';
  }
}