import { Component, Input } from '@angular/core';
import { FrameComponent } from '../frame/frame.component';

@Component({
  selector: 'QSeparator',
  standalone: true,
  imports: [FrameComponent],
  template: `
    <QFrame
      [shape]="shape"
      shadow="sunken"
      [lineWidth]="1">
    </QFrame>
  `
})
export class SeparatorComponent {

  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

  get shape(): 'hline' | 'vline' {
    return this.orientation === 'horizontal' ? 'hline' : 'vline';
  }
}
