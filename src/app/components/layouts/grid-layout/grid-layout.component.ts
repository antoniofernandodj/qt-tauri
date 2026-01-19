import { Component, Input } from '@angular/core';

@Component({
  selector: 'QGridLayout',
  styleUrls: [ './grid-layout.component.css' ],
  standalone: true,
  template: `
    <div
      class="qt-grid-layout"
      [style]="containerStyle">
      <ng-content></ng-content>
    </div>`,
})
export class GridLayoutComponent {

  @Input()
  columns = 2;

  @Input()
  spacing = 5;

  @Input()
  margin = 0;


  get containerStyle(): string {
    return `
      grid-template-columns: repeat(${this.columns}, 1fr);
      gap: ${this.spacing}px;
      padding: ${this.margin}px;
    `;
  }
}