import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  computed,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QProperty } from '../../../core/property';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

/**
 * @component QCalendarWidget
 * @description
 * Fornece uma exibição de calendário mensal, permitindo ao usuário selecionar uma data.
 * Equivalente ao QCalendarWidget do Qt.
 *
 * @purpose
 * Oferecer uma forma intuitiva e visual para seleção de datas em formulários ou agendadores,
 * mantendo a estética compacta e funcional do Qt Fusion.
 *
 * @solves
 * - **Seleção de Data**: Simplifica a entrada de datas complexas que seriam difíceis de digitar manualmente.
 * - **Visualização Mensal**: Permite ao usuário ver a distribuição dos dias da semana e meses adjacentes.
 * - **Sincronização Reativa**: Utiliza `QProperty` para garantir que a data selecionada esteja sempre em sincronia com o estado global da aplicação.
 *
 * @usage
 * ```html
 * <QCalendarWidget [model]="selectedDate" (selectionChanged)="onDateChanged($event)"></QCalendarWidget>
 * ```
 *
 * @prop {QProperty<Date>} model - Propriedade reativa que armazena a data selecionada.
 * @emit {Date} selectionChanged - Disparado quando a data selecionada no modelo muda.
 * @emit {Date} activated - Disparado quando uma data é selecionada via clique duplo.
 * @emit {Date} clicked - Disparado quando uma data é clicada.
 */
@Component({
  selector: 'QCalendarWidget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-widget.component.html',
  styleUrl: './calendar-widget.component.css'
})
export class CalendarWidgetComponent implements OnInit {

  /* =========================
     Qt-like binding
     ========================= */

  @Input({ required: true })
  model!: QProperty<Date>;

  /* =========================
     Qt-like signals
     ========================= */

  @Output() selectionChanged = new EventEmitter<Date>();
  @Output() activated = new EventEmitter<Date>();
  @Output() clicked = new EventEmitter<Date>();

  /* =========================
     Internal State
     ========================= */

  // viewDate signals which month/year we are currently viewing
  private viewDate = signal<Date>(new Date());

  readonly weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  readonly months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  calendarGrid = computed(() => {
    const view = this.viewDate();
    const year = view.getFullYear();
    const month = view.getMonth();
    const selected = this.model.value;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Get the day of the week for the first day (0=Sun, 1=Mon, ..., 6=Sat)
    // We want Mon=0, ..., Sun=6
    let startDay = firstDayOfMonth.getDay();
    startDay = (startDay === 0) ? 6 : startDay - 1;

    const days: CalendarDay[] = [];

    // Days from previous month
    const prevMonthLastDay = new Date(year, month, 0);
    for (let i = startDay - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthLastDay.getDate() - i);
      days.push(this.createCalendarDay(d, false, today, selected));
    }

    // Days from current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const d = new Date(year, month, i);
      days.push(this.createCalendarDay(d, true, today, selected));
    }

    // Days from next month to fill 42 cells (6 rows)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const d = new Date(year, month + 1, i);
      days.push(this.createCalendarDay(d, false, today, selected));
    }

    return days;
  });

  get currentMonthName(): string {
    return this.months[this.viewDate().getMonth()];
  }

  get currentYear(): number {
    return this.viewDate().getFullYear();
  }

  ngOnInit(): void {
    // Initialize viewDate to selected date if available
    if (this.model && this.model.value) {
      const d = new Date(this.model.value);
      d.setDate(1); // Set to first day of month for viewing
      this.viewDate.set(d);
    }
  }

  /* =========================
     Navigation
     ========================= */

  showPreviousMonth(): void {
    const d = new Date(this.viewDate());
    d.setMonth(d.getMonth() - 1);
    this.viewDate.set(d);
  }

  showNextMonth(): void {
    const d = new Date(this.viewDate());
    d.setMonth(d.getMonth() + 1);
    this.viewDate.set(d);
  }

  showPreviousYear(): void {
    const d = new Date(this.viewDate());
    d.setFullYear(d.getFullYear() - 1);
    this.viewDate.set(d);
  }

  showNextYear(): void {
    const d = new Date(this.viewDate());
    d.setFullYear(d.getFullYear() + 1);
    this.viewDate.set(d);
  }

  setSelectedDate(date: Date): void {
    const newDate = new Date(date);
    this.model.value = newDate;
    this.selectionChanged.emit(newDate);
    this.clicked.emit(newDate);
  }

  onDateDoubleClick(date: Date): void {
    this.setSelectedDate(date);
    this.activated.emit(new Date(date));
  }

  /* =========================
     Helpers
     ========================= */

  private createCalendarDay(date: Date, isCurrentMonth: boolean, today: Date, selected: Date): CalendarDay {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    const s = new Date(selected);
    s.setHours(0, 0, 0, 0);

    return {
      date: d,
      isCurrentMonth,
      isToday: d.getTime() === today.getTime(),
      isSelected: d.getTime() === s.getTime()
    };
  }
}
