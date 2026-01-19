import { Component, Input } from '@angular/core';

@Component({
  selector: 'QHBoxLayout',
  standalone: true,
  template: '<div class="qt-hbox-layout" [style]="containerStyle"><ng-content></ng-content></div>',
  styleUrls: [ './hbox-layout.component.css' ]
})
export class HBoxLayoutComponent {
  @Input() spacing = 0;
  @Input() margin = 0;
  @Input() align: 'start' | 'center' | 'end' | 'stretch' | 'between' = 'stretch';

  get containerStyle(): string {
    const justify = this.align === 'between' ? 'justify-content: space-between;' : '';
    const alignItems = this.align === 'between' ? 'center' : this.align;
    return `gap: ${this.spacing}px; padding: ${this.margin}px; align-items: ${alignItems}; ${justify}`;
  }
}
