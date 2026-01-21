import { Component, Input } from '@angular/core';
import { QProperty } from '../../../core/property';

@Component({
  selector: 'QProgressBar',
  standalone: true,
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {

  @Input() minimum = 0;
  @Input() maximum = 100;

  /** Qt-like binding */
  @Input() model?: QProperty<number>;

  /** fallback literal */
  @Input() value?: number;

  @Input() showText = true;
  @Input() busy = false;

  /** valor efetivo */
  get current(): number {
    if (this.model) {
      return this.model.value;
    }
    return this.value ?? this.minimum;
  }

  get percentage(): number {
    if (this.maximum <= this.minimum) return 0;

    const v = Math.min(
      this.maximum,
      Math.max(this.current, this.minimum)
    );

    return ((v - this.minimum) / (this.maximum - this.minimum)) * 100;
  }

  get text(): string {
    return `${Math.round(this.percentage)}%`;
  }

}
