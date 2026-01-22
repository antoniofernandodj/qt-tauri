import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'QToolBoxItem',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="qt-toolbox-section">
      <div
        class="qt-toolbox-header"
        [class.qt-active]="expanded"
        (click)="onHeaderClick()"
      >
        @if (icon) {
          <img [src]="icon" class="qt-toolbox-icon" alt="">
        }
        <span class="qt-toolbox-title">{{ title }}</span>
      </div>

      @if (expanded) {
        <div class="qt-toolbox-item-content">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
  styles: [`
    .qt-toolbox-section {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid var(--color-border-light, #d0d0d0);
    }

    .qt-toolbox-section:last-child {
      border-bottom: none;
    }

    .qt-toolbox-header {
      display: flex;
      align-items: center;
      padding: 10px 14px;
      background-color: var(--color-bg-secondary, #eaeaea);
      color: var(--color-text-primary, #222);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      user-select: none;
      transition: background-color 120ms ease, color 120ms ease;
    }

    .qt-toolbox-header:hover {
      background-color: var(--color-bg-hover, #dedede);
    }

    .qt-toolbox-header.qt-active {
      background-color: var(--color-accent-bg, #cfe3ff);
      color: var(--color-accent-primary, #0a4db8);
      font-weight: 600;
    }

    .qt-toolbox-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      flex-shrink: 0;
      object-fit: contain;
    }

    .qt-toolbox-title {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .qt-toolbox-item-content {
      padding: 12px 14px;
      background-color: var(--color-bg-primary, #ffffff);
      color: var(--color-text-primary, #222);
      font-size: 13px;
      line-height: 1.5;
      animation: qtToolboxFadeIn 160ms ease-out;
    }

    @keyframes qtToolboxFadeIn {
      from {
        opacity: 0;
        transform: translateY(-6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class ToolBoxItemComponent {
  @Input() title = '';
  @Input() icon?: string;
  @Output() headerClick = new EventEmitter<void>();
  
  expanded = false;

  onHeaderClick(): void {
    this.headerClick.emit();
  }
}

@Component({
  selector: 'QToolBox',
  standalone: true,
  template: `
    <div class="qt-toolbox">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .qt-toolbox {
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: var(--color-bg-primary, #f5f5f5);
      border: 1px solid var(--color-border-light, #cfcfcf);
      border-radius: 4px;
      overflow: hidden;
      font-family: var(--font-family, system-ui);
    }
  `]
})
export class ToolBoxComponent implements AfterContentInit {
  @ContentChildren(ToolBoxItemComponent)
  items!: QueryList<ToolBoxItemComponent>;

  @Input() currentIndex = 0;

  ngAfterContentInit(): void {
    // Conecta os eventos de clique
    this.items.forEach((item, index) => {
      item.headerClick.subscribe(() => this.toggleItem(index));
    });

    this.setCurrentIndex(this.currentIndex);
  }

  setCurrentIndex(index: number): void {
    if (index < 0 || index >= this.items.length) return;
    this.currentIndex = index;
    this.items.forEach((item, i) => {
      item.expanded = i === index;
    });
  }

  toggleItem(index: number): void {
    this.setCurrentIndex(index);
  }
}