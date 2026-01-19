import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ButtonKind = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'success';

@Component({
  selector: 'QPushButton',
  standalone: true,
  templateUrl: './push-button.component.html',
  styleUrls: [ './push-button.component.css' ]
})
export class PushButtonComponent {
  @Input() text = '';
  @Input() kind: ButtonKind = 'primary';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<MouseEvent>();

  isHover = false;
  isPressed = false;

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}