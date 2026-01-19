import { Component, Input } from '@angular/core';
import { Action } from '../../../core/action';
import { ToolButtonComponent } from '../tool-button/tool-button.component';


@Component({
  selector: 'QToolBar',
  standalone: true,
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
  imports: [
    ToolButtonComponent
  ]
})
export class ToolBarComponent {

  @Input()
  actions: Action[] = [];
}
