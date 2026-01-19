import { Component, Input } from '@angular/core';
import { Action } from '../../../core/action';

@Component({
  selector: 'QToolButton',
  standalone: true,
  imports: [],
  templateUrl: './tool-button.component.html',
  styleUrl: './tool-button.component.css'
})
export class ToolButtonComponent {
  @Input({ required: true })
  action!: Action;

  onClick(): void {
    this.action.trigger();
  }
}
