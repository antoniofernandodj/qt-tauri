import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input
} from '@angular/core';
import { NgFor } from '@angular/common';
import { QProperty } from '../../../core/property';

/**
 * @component QStackedWidgetPage
 * @description
 * Representa uma página individual dentro de um QStackedWidget.
 *
 * @purpose
 * Agrupar widgets que devem ser exibidos ou ocultados como uma única unidade dentro do widget empilhado.
 *
 * @solves
 * - **Gerenciamento de Visibilidade**: Resolve o problema de esconder/mostrar grupos de elementos complexos via propriedade `[hidden]`.
 */
@Component({
  selector: 'QStackedWidgetPage',
  standalone: true,
  template: `
    <div class="qt-stacked-page" [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `
})
export class StackedWidgetPageComponent {
  active = false;
}

/**
 * @component QStackedWidget
 * @description
 * Um widget de container que exibe uma página por vez de uma pilha de páginas.
 * Equivalente ao QStackedWidget do Qt.
 *
 * @purpose
 * Gerenciar coleções de widgets onde apenas um contexto deve estar ativo no momento.
 *
 * @solves
 * - **Economia de Espaço**: Permite reutilizar a mesma área da tela para diferentes funções da aplicação.
 *
 * @usage
 * ```html
 * <QStackedWidget [currentIndex]="activeTab">
 *    <QStackedWidgetPage>Conteúdo A</QStackedWidgetPage>
 *    <QStackedWidgetPage>Conteúdo B</QStackedWidgetPage>
 * </QStackedWidget>
 * ```
 */
@Component({
  selector: 'QStackedWidget',
  standalone: true,
  imports: [NgFor],
  templateUrl: './stacked-widget.component.html',
  styleUrls: ['./stacked-widget.component.css']
})
export class StackedWidgetComponent implements AfterContentInit {

  @ContentChildren(StackedWidgetPageComponent)
  pages!: QueryList<StackedWidgetPageComponent>;

  @Input()
  set currentIndex(index: number) {
    this._currentIndex = index;
    this.updatePages();
  }

  private _currentIndex = 0;

  updatePages(): void {
    if (!this.pages) return;
  
    this.pages.forEach((page, i) => {
      page.active = i === this._currentIndex;
    });
  }

  ngAfterContentInit(): void {
    this.updatePages();
  }

  /* =========================
     Qt-like API
     ========================= */

  // setCurrentIndex(index: QProperty<number>): void {
  //   if (index.value < 0 || index.value >= this.pages.length) {
  //     return;
  //   }

  //   this.currentIndex.value = index.value;
  //   this.pages.forEach((page, i) => {
  //     page.active = i === index.value;
  //   });
  // }

  // currentWidget(): number {
  //   return this.currentIndex.value;
  // }

  count(): number {
    return this.pages.length;
  }

  addWidget(): void {
    // Dinamicamente adicionado via ng-content
  }

  removeWidget(index: number): void {
    if (index >= 0 && index < this.pages.length) {
      const pagesArray = this.pages.toArray();
      pagesArray.splice(index, 1);
    }
  }
}
