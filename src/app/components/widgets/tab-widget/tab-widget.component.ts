import { NgFor } from '@angular/common';
import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input
} from '@angular/core';


@Component({
  selector: 'QTab',
  standalone: true,
  template: `
    <div class="qt-tab-page" [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
  @Input() title = '';
  active = false;
}


/**
 * @component QTabWidget
 * @description
 * Um widget de stack que fornece uma barra de abas no topo para alternar entre diferentes páginas de conteúdo.
 * Equivalente ao QTabWidget do Qt.
 *
 * @purpose
 * Economizar espaço na tela organizando o conteúdo em abas sobrepostas.
 *
 * @solves
 * - **Complexidade de Interface**: Divide diálogos ou janelas complexas em seções gerenciáveis.
 * - **Navegação Intuitiva**: Fornece uma metáfora visual clara (abas de pasta) para troca de contexto.
 * - **Sincronização de Estado**: Gerencia automaticamente qual "página" deve estar visível com base na aba clicada.
 *
 * @usage
 * ```html
 * <QTabWidget>
 *   <QTab label="Geral">
 *     <content-geral />
 *   </QTab>
 *   <QTab label="Avançado">
 *     <content-avancado />
 *   </QTab>
 * </QTabWidget>
 * ```
 *
 * @prop {number} currentIndex - Índice da aba ativa.
 * @emit {number} currentChanged - Disparado quando o usuário troca de aba.
 */
@Component({
  selector: 'QTabWidget',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tab-widget.component.html',
  styleUrl: './tab-widget.component.css'
})
export class TabWidgetComponent implements AfterContentInit {

  @ContentChildren(TabComponent)
  tabs!: QueryList<TabComponent>;

  currentIndex = 0;

  ngAfterContentInit(): void {
    if (this.tabs.length > 0) {
      this.selectTab(0);
    }
  }

  selectTab(index: number): void {
    this.currentIndex = index;
    this.tabs.forEach((tab, i) => {
      tab.active = i === index;
    });
  }
}




