import { Component, Input } from '@angular/core';

export type LabelAlignment =
  | 'left'
  | 'center'
  | 'right'
  | 'justify';

@Component({
  selector: 'QLabel',
  standalone: true,
  imports: [],
  templateUrl: './label.component.html',
  styleUrl: './label.component.css'
})
export class LabelComponent {

  @Input() text = '';
  @Input() alignment: LabelAlignment = 'left';
  @Input() wordWrap = false;
  @Input() rich = false;

  get textAlign(): string {
    return this.alignment;
  }

  get whiteSpace(): string {
    return this.wordWrap ? 'normal' : 'nowrap';
  }
}