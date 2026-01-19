import { Component, Input } from '@angular/core';

@Component({
  selector: 'QGridLayout',
  standalone: true,
  template: '<div class="qt-grid-layout" [style]="containerStyle"><ng-content></ng-content></div>',
  styleUrls: [ './grid-layout.component.css' ]
})
export class GridLayoutComponent {
  @Input() columns = 2;
  @Input() spacing = 5;
  @Input() margin = 0;

  get containerStyle(): string {
    return `
      grid-template-columns: repeat(${this.columns}, 1fr);
      gap: ${this.spacing}px;
      padding: ${this.margin}px;
    `;
  }
}