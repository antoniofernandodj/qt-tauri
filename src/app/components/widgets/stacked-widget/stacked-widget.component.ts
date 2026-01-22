import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input
} from '@angular/core';
import { NgFor } from '@angular/common';
import { QProperty } from '../../../core/property';

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
