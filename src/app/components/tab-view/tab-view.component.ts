import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';


export interface TabItem {
  title: string;
  component?: any;
  template?: any;
}

@Component({
  selector: 'QTabView',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tab-view.component.html',
  styleUrls: [ './tab-view.component.css' ]
})
export class TabViewComponent implements OnInit {
  @Input() tabs: TabItem[] = [];
  activeIndex = 0;

  ngOnInit(): void {
    if (this.tabs.length === 0) {
      console.warn('TabView: No tabs provided');
    }
  }

  selectTab(index: number): void {
    this.activeIndex = index;
  }
}
