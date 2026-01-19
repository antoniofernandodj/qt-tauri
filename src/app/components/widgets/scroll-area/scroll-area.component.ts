import { Component, Input } from '@angular/core';

@Component({
  selector: 'QScrollArea',
  standalone: true,
  imports: [],
  templateUrl: './scroll-area.component.html',
  styleUrl: './scroll-area.component.css'
})
export class ScrollAreaComponent {

  @Input() horizontal = true;
  @Input() vertical = true;

  get overflowX(): string {
    return this.horizontal ? 'auto' : 'hidden';
  }

  get overflowY(): string {
    return this.vertical ? 'auto' : 'hidden';
  }
}