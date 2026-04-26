import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

interface StatusItem {
  id: number;
  permanent: boolean;
}

/**
 * @component QStatusBar
 * @description
 * Uma barra horizontal na parte inferior de uma aplicação para exibir informações de status.
 * Equivalente ao QStatusBar do Qt.
 *
 * @purpose
 * Fornecer feedback não intrusivo ao usuário sobre o estado da aplicação ou progresso de operações.
 *
 * @solves
 * - **Feedback de Operação**: Resolve a necessidade de mostrar mensagens temporárias (ex: "Arquivo salvo") sem interromper o fluxo do usuário com diálogos.
 * - **Informação Permanente**: Permite adicionar widgets fixos (como indicadores de conexão ou status de caps lock) no lado direito.
 *
 * @usage
 * ```ts
 * @ViewChild(StatusBarComponent) statusBar!: StatusBarComponent;
 * 
 * this.statusBar.showMessage("Processando...", 3000);
 * ```
 */
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
