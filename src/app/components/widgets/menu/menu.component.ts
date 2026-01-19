import { Component, Input } from '@angular/core';
import { Action } from '../../../core/action';
import { Separator } from '../../../core/separator';

@Component({
  selector: 'QMenu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  type?: string
  text = '';
  checked = false;
  checkable = false;
  enabled = false;

  @Input({ required: true })
  title!: string;

  @Input()
  actions: (Action | MenuComponent)[] = [];

  open = false;

  toggle(): void {
    this.open = !this.open;
  }

  close(): void {
    this.open = false;
  }

  onActionClick(action: Action | Separator | MenuComponent): void {

    if (action instanceof Action) {
      action.trigger();
    }
    this.close();
  }

  instanceOfMenuComponent(action: Action | Separator | MenuComponent) {
    return action instanceof MenuComponent
  }
}
