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




