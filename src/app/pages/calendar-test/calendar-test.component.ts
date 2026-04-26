import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QProperty } from '../../core/property';
import { QObjectState } from '../../core/qobjectState';
import { CalendarWidgetComponent } from '../../components/widgets/calendar/calendar-widget.component';
import { VBoxLayoutComponent } from '../../components/layouts/vbox-layout/vbox-layout.component';
import { GroupBoxComponent } from '../../components/widgets/group-box/group-box.component';
import { LabelComponent } from '../../components/widgets/label/label.component';

class CalendarPageState extends QObjectState {
  selectedDate = new QProperty<Date>(new Date());
}

@Component({
  selector: 'app-calendar-test',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CalendarWidgetComponent,
    VBoxLayoutComponent,
    GroupBoxComponent,
    LabelComponent
  ],
  providers: [CalendarPageState],
  template: `
    <a routerLink="/" class="qt-nav-back">← Back to Home</a>
    
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
  activationMessage = 'Double click a date to activate it.';

  constructor(public state: CalendarPageState) {}

  onDateChanged(date: Date): void {
    console.log('Date changed:', date);
  }

  onDateActivated(date: Date): void {
    this.activationMessage = 'Activated: ' + date.toDateString();
  }
}
