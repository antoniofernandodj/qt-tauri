import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ElementRef,
  ViewChildren,
  HostBinding
} from '@angular/core';
import { NgFor } from '@angular/common';

interface PaneSize {
  index: number;
  size: number;
}

/**
 * @component QSplitterPane
 * @description
 * Um container de painel individual para ser usado dentro de um QSplitter.
 *
 * @purpose
 * Definir as propriedades de dimensionamento e comportamento de uma seção específica do splitter.
 *
 * @solves
 * - **Controle de Dimensão**: Permite definir tamanhos iniciais, mínimos e máximos para cada painel de forma independente.
 * - **Comportamento de Colapso**: Define se um painel pode ser completamente escondido ao ser redimensionado além do seu limite mínimo.
 */
@Component({
  selector: 'QSplitterPane',
  standalone: true,
  template: `
    <div class="qt-splitter-pane">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      overflow: auto;
    }
    
    .qt-splitter-pane {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `]
})
export class SplitterPaneComponent {
  @Input() initialSize?: number;
  @Input() minSize = 50;
  @Input() maxSize?: number;
  @Input() collapsible = false;
}

/**
 * @component QSplitter
 * @description
 * Um widget que gerencia a divisão de espaço entre dois ou mais widgets, permitindo que o usuário redimensione as áreas arrastando uma alça.
 * Equivalente ao QSplitter do Qt.
 *
 * @purpose
 * Permitir que o usuário controle dinamicamente a proporção de espaço entre diferentes seções da interface.
 *
 * @solves
 * - **Rigidez de Layout**: Resolve o problema de layouts fixos que não se adaptam às necessidades momentâneas do usuário (ex: aumentar a área de código e diminuir o explorador de arquivos).
 * - **Multi-painéis**: Suporta múltiplos painéis e orientações (horizontal/vertical).
 *
 * @usage
 * ```html
 * <QSplitter orientation="horizontal">
 *   <QSplitterPane [initialSize]="30">
 *     <sidebar-content />
 *   </QSplitterPane>
 *   <QSplitterPane>
 *     <main-content />
 *   </QSplitterPane>
 * </QSplitter>
 * ```
 */
@Component({
  selector: 'QSplitter',
  standalone: true,
  imports: [NgFor],
  templateUrl: './splitter.component.html',
  styleUrls: ['./splitter.component.css']
})
export class SplitterComponent implements AfterContentInit {

  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() handleWidth = 6;
  @Input() liveUpdate = true;

  @ContentChildren(SplitterPaneComponent)
  panes!: QueryList<SplitterPaneComponent>;

  @ViewChildren('paneElement', { read: ElementRef })
  paneElements!: QueryList<ElementRef<HTMLDivElement>>;

  @ViewChildren('handleElement', { read: ElementRef })
  handleElements!: QueryList<ElementRef<HTMLDivElement>>;

  paneSizes: number[] = [];
  isDragging = false;
  currentHandleIndex = -1;

  private startPos = 0;
  private startSizes: number[] = [];

  @HostBinding('class.qt-horizontal')
  get isHorizontal(): boolean {
    return this.orientation === 'horizontal';
  }

  @HostBinding('class.qt-vertical')
  get isVertical(): boolean {
    return this.orientation === 'vertical';
  }

  ngAfterContentInit(): void {
    this.initializeSizes();
  }

  private initializeSizes(): void {
    const paneArray = this.panes.toArray();
    const totalPanes = paneArray.length;

    if (totalPanes === 0) return;

    // Calculate initial sizes
    let totalSpecified = 0;
    let unspecifiedCount = 0;

    paneArray.forEach(pane => {
      if (pane.initialSize !== undefined) {
        totalSpecified += pane.initialSize;
      } else {
        unspecifiedCount++;
      }
    });

    const remaining = 100 - totalSpecified;
    const defaultSize = unspecifiedCount > 0 ? remaining / unspecifiedCount : 0;

    this.paneSizes = paneArray.map(pane =>
      pane.initialSize !== undefined ? pane.initialSize : defaultSize
    );
  }

  onHandleMouseDown(event: MouseEvent, handleIndex: number): void {
    event.preventDefault();

    this.isDragging = true;
    this.currentHandleIndex = handleIndex;

    this.startPos = this.orientation === 'horizontal'
      ? event.clientX
      : event.clientY;

    this.startSizes = [...this.paneSizes];

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    document.body.style.cursor = this.orientation === 'horizontal'
      ? 'col-resize'
      : 'row-resize';

    document.body.style.userSelect = 'none';
  }

  private onMouseMove = (event: MouseEvent): void => {
    if (!this.isDragging) return;

    const currentPos = this.orientation === 'horizontal'
      ? event.clientX
      : event.clientY;

    const delta = currentPos - this.startPos;

    this.updateSizes(delta);
  };

  private onMouseUp = (): void => {
    this.isDragging = false;
    this.currentHandleIndex = -1;

    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  private updateSizes(delta: number): void {
    const handleIndex = this.currentHandleIndex;
    const paneArray = this.panes.toArray();

    if (handleIndex < 0 || handleIndex >= paneArray.length - 1) return;

    const containerSize = this.getContainerSize();
    const pixelDelta = (delta / containerSize) * 100;

    const leftPane = paneArray[handleIndex];
    const rightPane = paneArray[handleIndex + 1];

    let newLeftSize = this.startSizes[handleIndex] + pixelDelta;
    let newRightSize = this.startSizes[handleIndex + 1] - pixelDelta;

    // Apply constraints
    newLeftSize = Math.max(leftPane.minSize, newLeftSize);
    if (leftPane.maxSize) {
      newLeftSize = Math.min(leftPane.maxSize, newLeftSize);
    }

    newRightSize = Math.max(rightPane.minSize, newRightSize);
    if (rightPane.maxSize) {
      newRightSize = Math.min(rightPane.maxSize, newRightSize);
    }

    // Ensure total is maintained
    const adjustment = (newLeftSize + newRightSize) - (this.startSizes[handleIndex] + this.startSizes[handleIndex + 1]);
    newRightSize -= adjustment;

    this.paneSizes[handleIndex] = newLeftSize;
    this.paneSizes[handleIndex + 1] = newRightSize;
  }

  private getContainerSize(): number {
    const element = (this.paneElements.first?.nativeElement as HTMLElement)?.parentElement;
    if (!element) return 1000;

    return this.orientation === 'horizontal'
      ? element.clientWidth
      : element.clientHeight;
  }

  getPaneStyle(index: number): any {
    const size = this.paneSizes[index] || 0;

    if (this.orientation === 'horizontal') {
      return {
        width: `${size}%`,
        height: '100%'
      };
    } else {
      return {
        width: '100%',
        height: `${size}%`
      };
    }
  }

  get handleSize(): string {
    return `${this.handleWidth}px`;
  }

  get paneArray() {
    return this.panes?.toArray() || [];
  }
}