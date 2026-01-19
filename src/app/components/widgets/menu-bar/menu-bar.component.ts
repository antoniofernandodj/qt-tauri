import { Component, ContentChildren, QueryList } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'QMenuBar',
  standalone: true,
  template: `
    <div class="qt-menubar">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  @ContentChildren(MenuComponent)
  menus!: QueryList<MenuComponent>;

  closeAll(): void {
    this.menus.forEach(m => m.close());
  }
}
