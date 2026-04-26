import {
  Component,
  Input,
  HostBinding,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { QProperty } from '../../../core/property';

/**
 * @component QSlider
 * @description
 * Um widget de controle deslizante que permite ao usuário escolher um valor movendo um controle ao longo de uma trilha.
 * Equivalente ao QSlider do Qt.
 *
 * @purpose
 * Fornecer uma forma intuitiva e visual de ajustar valores numéricos dentro de um intervalo fixo.
 *
 * @solves
 * - **Ajustes Rápidos**: Permite mudanças grosseiras de valor mais rapidamente do que digitando em um LineEdit ou SpinBox.
 * - **Visualização de Escala**: Dá ao usuário uma noção clara de onde o valor atual se situa em relação aos limites mínimo e máximo.
 *
 * @usage
 * ```html
 * <QSlider 
 *   [min]="0" 
 *   [max]="100" 
 *   [model]="state.volume"
 *   orientation="horizontal"
 * ></QSlider>
 * ```
 *
 * @prop {QProperty<number>} model - Binding do valor numérico.
 * @prop {number} min - Valor mínimo permitido.
 * @prop {number} max - Valor máximo permitido.
 * @prop {number} step - Incremento por clique/movimento.
 * @prop {'horizontal' | 'vertical'} orientation - Direção do slider.
 * @emit {number} valueChanged - Disparado enquanto o slider é movido.
 */
@Component({
  selector: 'QSlider',
  standalone: true,
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {

  /* =========================
     Qt-like API
     ========================= */

  @Input({ required: false })
  model: QProperty<number> = new QProperty(0);

  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() disabled = false;

  @Output()
  modelChange = new EventEmitter<number>();

  @ViewChild('track', { static: true })
  track!: ElementRef<HTMLDivElement>;

  /* =========================
     Interaction
     ========================= */

  onTrackClick(event: MouseEvent): void {
    if (this.disabled) return;
    this.updateValueFromEvent(event);
  }

  onThumbMouseDown(event: MouseEvent): void {
    if (this.disabled) return;

    event.preventDefault();

    const move = (e: MouseEvent) => this.updateValueFromEvent(e);
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  }

  private updateValueFromEvent(event: MouseEvent): void {
    const rect = this.track.nativeElement.getBoundingClientRect();

    const ratio =
      this.orientation === 'horizontal'
        ? (event.clientX - rect.left) / rect.width
        : 1 - (event.clientY - rect.top) / rect.height;

    const raw = this.min + ratio * (this.max - this.min);
    const stepped = Math.round(raw / this.step) * this.step;

    this.value = this.clamp(stepped);
  }

  private clamp(v: number): number {
    return Math.min(this.max, Math.max(this.min, v));
  }

  /* =========================
     Binding
     ========================= */

  get value(): number {
    return this.model.value;
  }

  set value(v: number) {
    if (this.model.value === v) return;
  
    this.model.value = v;
    this.modelChange.emit(v);
  }

  get percent(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  /* =========================
     Host bindings
     ========================= */

  @HostBinding('class.qt-disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }

  @HostBinding('class.qt-vertical')
  get isVertical(): boolean {
    return this.orientation === 'vertical';
  }
}
