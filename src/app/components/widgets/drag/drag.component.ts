import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  HostBinding,
  ElementRef
} from '@angular/core';

export interface DragData {
  type: string;
  data: any;
}

export interface DragStartEvent {
  data: DragData;
  source: ElementRef;
}

@Component({
  selector: 'QDrag',
  standalone: true,
  template: `
    <div 
      class="qt-drag-container"
      [class.qt-dragging]="isDragging"
      [class.qt-disabled]="disabled"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./drag.component.css']
})
export class DragComponent {

  @Input() dragData!: DragData;
  @Input() disabled = false;
  @Input() dragEffect: 'copy' | 'move' | 'link' = 'move';

  @Output() dragStarted = new EventEmitter<DragStartEvent>();
  @Output() dragEnded = new EventEmitter<void>();

  isDragging = false;

  constructor(private elementRef: ElementRef) {}

  @HostBinding('attr.draggable')
  get draggable(): boolean {
    return !this.disabled;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    if (this.disabled || !this.dragData) {
      event.preventDefault();
      return;
    }

    this.isDragging = true;

    // Set drag data
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = this.dragEffect;
      event.dataTransfer.setData(
        'application/json',
        JSON.stringify(this.dragData)
      );

      // Optional: Set drag image
      const dragImage = this.elementRef.nativeElement.querySelector('.qt-drag-container');
      if (dragImage) {
        event.dataTransfer.setDragImage(dragImage, 0, 0);
      }
    }

    this.dragStarted.emit({
      data: this.dragData,
      source: this.elementRef
    });
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent): void {
    this.isDragging = false;
    this.dragEnded.emit();
  }
}