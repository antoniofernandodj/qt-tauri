import { Component, Input } from '@angular/core';

@Component({
  selector: 'QVBoxLayout',
  standalone: true,
  template: '<div class="qt-vbox-layout" [style]="containerStyle"><ng-content></ng-content></div>',
  styleUrls: [ './vbox-layout.component.css' ]
})
export class VBoxLayoutComponent {
  @Input() spacing = 0;
  @Input() margin = 0;
  @Input() align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

  get containerStyle(): string {
    return `gap: ${this.spacing}px; padding: ${this.margin}px;`;
  }
}