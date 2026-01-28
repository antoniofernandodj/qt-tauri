import { Component, Input } from '@angular/core';

@Component({
  selector: 'QHBoxLayout',
  standalone: true,
  template: `
    <div
      class="qt-hbox-layout"
      [style]="containerStyle">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: [ './hbox-layout.component.css' ]
})
export class HBoxLayoutComponent {
  @Input() spacing = 0;
  @Input() margin = 0;
  @Input() align: 'start' | 'center' | 'end' | 'stretch' | 'between' = 'stretch';

  @Input() width?: string | number;
  @Input() height?: string | number;

  get containerStyle(): string {
    const justify = this.align === 'between' ? 'justify-content: space-between;' : '';
    const alignItems = this.align === 'between' ? 'center' : this.align;

    let style = `gap: ${this.spacing}px; padding: ${this.margin}px; align-items: ${alignItems}; ${justify}`;

    if (this.width !== undefined) {
      style += ` width: ${typeof this.width === 'number' ? this.width + 'px' : this.width};`;
    }

    if (this.height !== undefined) {
      style += ` height: ${typeof this.height === 'number' ? this.height + 'px' : this.height};`;
    }

    return style;
  }
}
