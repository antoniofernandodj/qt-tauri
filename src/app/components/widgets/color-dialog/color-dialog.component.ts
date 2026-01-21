import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { SliderComponent } from '../slider/slider.component';
import { QProperty } from '../../../core/property';

@Component({
  selector: 'QColorDialog',
  standalone: true,
  imports: [CommonModule, SliderComponent],
  templateUrl: './color-dialog.component.html',
  styleUrls: ['./color-dialog.component.css']
})
export class ColorDialogComponent {

  /* =========================
     Qt-like binding
     ========================= */

  @Input({ required: true })
  model!: QProperty<string>; // #RRGGBB

  @Input()
  visible!: QProperty<boolean>;

  /* =========================
     Qt-like signals
     ========================= */

  @Output() accepted = new EventEmitter<void>();
  @Output() rejected = new EventEmitter<void>();
  @Output() colorSelected = new EventEmitter<string>();

  /* =========================
     Internal state (RGB)
     ========================= */

  r = new QProperty<number>(255);
  g = new QProperty<number>(0);
  b = new QProperty<number>(0);

  ngOnInit(): void {
    this.syncFromHex(this.model.value);
    this.r.value = 0;
    this.g.value = 0;
    this.b.value = 0;
    this.model.value = "#000000"
  }

  /* =========================
     Synchronization
     ========================= */

  private syncFromHex(hex: string): void {
    const [r, g, b] = this.hexToRgb(hex);
    this.r.value = (!Number.isNaN(r)) ? r : 0;
    this.g.value = (!Number.isNaN(b)) ? g : 0;
    this.b.value = (!Number.isNaN(b)) ? b : 0;
  }

  private syncToHex(): void {
    const hex = this.rgbToHex(
      this.r.value,
      this.g.value,
      this.b.value
    );
    this.model.value = hex;
    this.colorSelected.emit(hex);
  }

  onRgbChanged(): void {
    this.syncToHex();
  }

  /* =========================
     Actions
     ========================= */

  accept(): void {
    this.visible.value = false;
    this.accepted.emit();
    this.r.value = 0;
    this.g.value = 0;
    this.b.value = 0;
    this.model.value = "#000000"
  }

  cancel(): void {
    this.visible.value = false;
    this.rejected.emit();
    this.r.value = 0;
    this.g.value = 0;
    this.b.value = 0;
    this.model.value = "#000000"
  }

  /* =========================
     Utilities
     ========================= */

  private rgbToHex(r: number, g: number, b: number): string {
    return (
      '#' +
      [r, g, b]
        .map(v => v.toString(16).padStart(2, '0'))
        .join('')
    );
  }

  private hexToRgb(hex: string): [number, number, number] {
    const v = hex.replace('#', '');
    return [
      parseInt(v.slice(0, 2), 16),
      parseInt(v.slice(2, 4), 16),
      parseInt(v.slice(4, 6), 16)
    ];
  }
}
