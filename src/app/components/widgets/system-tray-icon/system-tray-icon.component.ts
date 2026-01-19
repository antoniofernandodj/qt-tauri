import { Component, Input, OnInit } from '@angular/core';
import { TrayIcon, TrayIconOptions } from '@tauri-apps/api/tray';
import { Menu, MenuItem } from '@tauri-apps/api/menu';
import { defaultWindowIcon } from '@tauri-apps/api/app';
import { listen } from '@tauri-apps/api/event';

export interface TrayItem {
  id: string,
  text: string
}

@Component({ selector: 'QSystemTray', template: '', standalone: true })
export class SystemTrayComponent implements OnInit {

  private tray?: TrayIcon;
  @Input()
  items!: TrayItem[];

  async ngOnInit() {
    await this.initTray();
  }

  private async initTray() {
    const menu = await Menu.new({ items: this.items });

    let icon = await defaultWindowIcon();
    if (icon) {
      const options: TrayIconOptions = {
        icon: icon,
        menu: menu,
        tooltip: 'My Angular Tauri App',
        menuOnLeftClick: true,
      };
      this.tray = await TrayIcon.new(options);
      // Listen menu events
      await listen('tauri://tray-menu-item-clicked', ({ payload }: any) => {
        this.handleTrayAction(payload.id);
      });
    }
  }

  private handleTrayAction(actionId: string) {
    switch (actionId) {
      case 'show':
        window.focus();
        break;
      case 'settings':
        // abrir modal/rota de configurações
        break;
      case 'quit':
        window.close();
        break;
    }
  }
}
