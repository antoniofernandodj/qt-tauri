import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QProperty } from '../../core/property';
import { QObjectState } from '../../core/qobjectState';
import { CalendarWidgetComponent } from '../../components/widgets/calendar/calendar-widget.component';
import { VBoxLayoutComponent } from '../../components/layouts/vbox-layout/vbox-layout.component';
import { GroupBoxComponent } from '../../components/widgets/group-box/group-box.component';
import { LabelComponent } from '../../components/widgets/label/label.component';
import { PushButtonComponent } from '../../components/widgets/push-button/push-button.component';

class CalendarPageState extends QObjectState {
  selectedDate = new QProperty<Date>(new Date());
}

@Component({
  selector: 'app-calendar-test',
  standalone: true,
  imports: [
    CommonModule,
    CalendarWidgetComponent,
    VBoxLayoutComponent,
    GroupBoxComponent,
    LabelComponent,
    PushButtonComponent
  ],
  providers: [CalendarPageState],
  template: `
    <QPushButton text="← Back to Home" kind="ghost" (clicked)="goHome()" />
    
    <div style="padding: 20px;">
      <QVBoxLayout [spacing]="20">
        <QGroupBox title="QCalendarWidget Showcase">
          <QVBoxLayout [spacing]="10">
            <QCalendarWidget 
              [model]="state.selectedDate"
              (selectionChanged)="onDateChanged($event)"
            ></QCalendarWidget>
            
            <QLabel [text]="'Selected Date: ' + (state.selectedDate.value | date:'fullDate')"></QLabel>
          </QVBoxLayout>
        </QGroupBox>

        <QGroupBox title="Double Click Activation">
          <QVBoxLayout [spacing]="10">
            <QCalendarWidget 
              [model]="state.selectedDate"
              (activated)="onDateActivated($event)"
            ></QCalendarWidget>
            <QLabel [text]="activationMessage"></QLabel>
          </QVBoxLayout>
        </QGroupBox>
      </QVBoxLayout>
    </div>
  `
})
export class CalendarTestComponent {
  private router = inject(Router);
  activationMessage = 'Double click a date to activate it.';

  constructor(public state: CalendarPageState) {}

  goHome(): void { this.router.navigate(['/']); }

  onDateChanged(date: Date): void {
    console.log('Date changed:', date);
  }

  onDateActivated(date: Date): void {
    this.activationMessage = 'Activated: ' + date.toDateString();
  }
}
