import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

export type ButtonKind = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'success';

@Component({
  selector: 'QPushButton',
  standalone: true,
  templateUrl: './push-button.component.html',
  styleUrls: ['./push-button.component.css']
})
export class PushButtonComponent {
  @Input() text = '';
  @Input() kind: ButtonKind = 'primary';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<MouseEvent>();

  // Estados visuais
  isHover = false;
  isPressed = false;
  
  // Estado checked (usado pelo ButtonGroup)
  isChecked = false;
  
  // Flag para indicar que está dentro de um ButtonGroup
  inButtonGroup = false;

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }

  @HostBinding('class.qt-checked')
  get checkedClass(): boolean {
    return this.isChecked;
  }

  @HostBinding('class.qt-in-group')
  get inGroupClass(): boolean {
    return this.inButtonGroup;
  }
}