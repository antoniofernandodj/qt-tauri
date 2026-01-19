import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

interface StatusItem {
  id: number;
  permanent: boolean;
}

@Component({
  selector: 'QStatusBar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent {

  private idCounter = 0;

  message: string | null = null;
  private messageTimer: any = null;

  items: StatusItem[] = [];

  /* =========================
     Qt API equivalents
     ========================= */

  showMessage(text: string, timeout = 0): void {
    this.message = text;

    if (this.messageTimer) {
      clearTimeout(this.messageTimer);
      this.messageTimer = null;
    }

    if (timeout > 0) {
      this.messageTimer = setTimeout(() => {
        this.clearMessage();
      }, timeout);
    }
  }

  clearMessage(): void {
    this.message = null;
  }

  addWidget(): number {
    return this.items.push({
      id: ++this.idCounter,
      permanent: false
    });
  }

  addPermanentWidget(): number {
    return this.items.push({
      id: ++this.idCounter,
      permanent: true
    });
  }

  removeWidget(id: number): void {
    this.items = this.items.filter(i => i.id !== id);
  }

  /* =========================
     Internal helpers
     ========================= */

  leftItems(): StatusItem[] {
    return this.items.filter(i => !i.permanent);
  }

  rightItems(): StatusItem[] {
    return this.items.filter(i => i.permanent);
  }
}
