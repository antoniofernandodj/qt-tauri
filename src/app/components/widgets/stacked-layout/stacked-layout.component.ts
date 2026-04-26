import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  TemplateRef
} from '@angular/core';
import { NgFor, NgTemplateOutlet } from '@angular/common';

/**
 * @component QStackedLayoutItem
 * @description
 * Um wrapper para itens individuais dentro de um QStackedLayout.
 *
 * @purpose
 * Isolar o conteúdo de cada página no layout empilhado, permitindo que o pai controle sua visibilidade.
 */
@Component({
  selector: 'QStackedLayoutItem',
  standalone: true,
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class StackedLayoutItemComponent {
  @ContentChildren(TemplateRef) template!: QueryList<TemplateRef<any>>;
}

/**
 * @component QStackedLayout
 * @description
 * Um gerenciador de layout que exibe apenas um widget por vez de uma pilha de widgets.
 * Equivalente ao QStackedLayout do Qt.
 *
 * @purpose
 * Fornecer navegação entre páginas ou estados de UI sem mudar de rota, mantendo todos os componentes instanciados.
 *
 * @solves
 * - **Navegação de Fluxo**: Ideal para assistentes (wizards) ou interfaces com múltiplos estados visuais.
 * - **Troca Instantânea**: Como os componentes estão pré-carregados, a troca é imediata e sem interrupções.
 *
 * @usage
 * ```html
 * <QStackedLayout [currentIndex]="state.page">
 *   <QStackedLayoutItem>Página 1</QStackedLayoutItem>
 *   <QStackedLayoutItem>Página 2</QStackedLayoutItem>
 * </QStackedLayout>
 * ```
 */
@Component({
  selector: 'QStackedLayout',
  standalone: true,
  imports: [NgFor, NgTemplateOutlet],
  templateUrl: './stacked-layout.component.html',
  styleUrls: ['./stacked-layout.component.css']
})
export class StackedLayoutComponent implements AfterContentInit {

  @ContentChildren(StackedLayoutItemComponent)
  items!: QueryList<StackedLayoutItemComponent>;

  @Input() currentIndex = 0;
  @Input() spacing = 0;

  itemsArray: any[] = [];

  ngAfterContentInit(): void {
    this.itemsArray = this.items.toArray();
    if (this.itemsArray.length > 0) {
      this.setCurrentIndex(this.currentIndex);
    }
  }

  /* =========================
     Qt-like API
     ========================= */

  setCurrentIndex(index: number): void {
    if (index < 0 || index >= this.itemsArray.length) {
      return;
    }
    this.currentIndex = index;
  }

  currentWidget(): number {
    return this.currentIndex;
  }

  count(): number {
    return this.itemsArray.length;
  }

  get containerStyle(): string {
    return `padding: ${this.spacing}px;`;
  }
}