import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  HostBinding
} from '@angular/core';
import { DragData } from '../drag/drag.component';

export interface DropEvent {
  data: DragData;
  effect: string;
}

@Component({
  selector: 'QDrop',
  standalone: true,
  template: `
    <div 
      class="qt-drop-container"
      [class.qt-drop-over]="isOver"
      [class.qt-drop-valid]="isOver && isValidDrop"
      [class.qt-drop-invalid]="isOver && !isValidDrop"
      [class.qt-disabled]="disabled"
    >
      <ng-content></ng-content>
      
      @if (isOver && showDropIndicator) {
        <div class="qt-drop-indicator">
          <span class="qt-drop-icon">{{ isValidDrop ? '✓' : '✗' }}</span>
          <span class="qt-drop-text">
            {{ isValidDrop ? dropMessage : invalidDropMessage }}
          </span>
        </div>
      }
    </div>
  `,
  styleUrls: ['./drop.component.css']
})
export class DropComponent {

  @Input() acceptTypes: string[] = [];
  @Input() disabled = false;
  @Input() dropEffect: 'copy' | 'move' | 'link' = 'move';
  @Input() showDropIndicator = true;
  @Input() dropMessage = 'Drop here';
  @Input() invalidDropMessage = 'Cannot drop here';

  @Output() dropped = new EventEmitter<DropEvent>();
  @Output() dragEnter = new EventEmitter<DragEvent>();
  @Output() dragLeave = new EventEmitter<DragEvent>();

  isOver = false;
  isValidDrop = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    if (this.disabled) return;

    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = this.dropEffect;
    }

    if (!this.isOver) {
      this.isOver = true;
      this.checkValidDrop(event);
      this.dragEnter.emit(event);
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    if (this.disabled) return;

    // Check if we're leaving the drop zone entirely
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;

    if (
      x <= rect.left ||
      x >= rect.right ||
      y <= rect.top ||
      y >= rect.bottom
    ) {
      this.isOver = false;
      this.isValidDrop = false;
      this.dragLeave.emit(event);
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    if (this.disabled) return;

    event.preventDefault();
    event.stopPropagation();

    this.isOver = false;

    if (!event.dataTransfer) return;

    try {
      const jsonData = event.dataTransfer.getData('application/json');
      if (!jsonData) return;

      const dragData: DragData = JSON.parse(jsonData);

      // Validate drop type
      if (this.acceptTypes.length > 0 && !this.acceptTypes.includes(dragData.type)) {
        this.isValidDrop = false;
        return;
      }

      this.isValidDrop = true;

      this.dropped.emit({
        data: dragData,
        effect: event.dataTransfer.dropEffect
      });
    } catch (error) {
      console.error('Failed to parse drop data:', error);
    }
  }

  private checkValidDrop(event: DragEvent): void {
    if (!event.dataTransfer) {
      this.isValidDrop = false;
      return;
    }

    try {
      const jsonData = event.dataTransfer.getData('application/json');
      if (!jsonData) {
        this.isValidDrop = true; // Can't check yet, assume valid
        return;
      }

      const dragData: DragData = JSON.parse(jsonData);
      this.isValidDrop =
        this.acceptTypes.length === 0 ||
        this.acceptTypes.includes(dragData.type);
    } catch {
      this.isValidDrop = true;
    }
  }
}