import { Component, Input } from '@angular/core';

@Component({
  selector: 'QFormLayout',
  template: `
    <div
        class="qt-form-layout"
        [style]="containerStyle">
            <ng-content></ng-content>
    </div>
  `,
  styleUrls: [ './form-layout.component.css' ]
})
export class FormLayoutComponent {
  @Input() spacing = 5;
  @Input() margin = 0;
  @Input() labelSpacing = 10;

  get containerStyle(): string {
    return `gap: ${this.spacing}px ${this.labelSpacing}px; padding: ${this.margin}px;`;
  }
}