import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  TemplateRef
} from '@angular/core';
import { NgFor, NgTemplateOutlet } from '@angular/common';

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