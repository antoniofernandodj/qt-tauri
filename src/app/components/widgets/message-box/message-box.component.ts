import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MessageBoxOptions,
  MessageBoxResult
} from '../../../core/message-box';

@Component({
  selector: 'QMessageBox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent {

  options!: MessageBoxOptions;

  @Output()
  closed = new EventEmitter<MessageBoxResult>();

  close(result: MessageBoxResult): void {
    this.closed.emit(result);
  }

  get icon(): string {
    switch (this.options.type) {
      case 'information': return 'ℹ️';
      case 'warning':     return '⚠️';
      case 'critical':    return '❌';
      case 'question':    return '❓';
      case 'success':     return '✔️';
    }
  }

  get iconClass(): string {
    switch (this.options.type) {
      case 'information': return 'info';
      case 'warning':     return 'warning';
      case 'critical':    return 'error';
      case 'question':    return 'info';
      case 'success':     return 'success';
    }
  }

  label(b: MessageBoxResult): string {
    switch (b) {
      case 'ok':     return 'OK';
      case 'cancel': return 'Cancel';
      case 'yes':    return 'Yes';
      case 'no':     return 'No';
    }
  }
}