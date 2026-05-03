import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { VBoxLayoutComponent } from '../../components/layouts/vbox-layout/vbox-layout.component';
import { HBoxLayoutComponent } from '../../components/layouts/hbox-layout/hbox-layout.component';
import { PushButtonComponent } from '../../components/widgets/push-button/push-button.component';
import { RadioButtonComponent } from '../../components/widgets/radio-button/radio-button.component';
import { RadioGroupComponent } from '../../components/widgets/radio-group/radio-group.component';
import { CheckBoxComponent } from '../../components/widgets/check-box/check-box.component';
import { LineEditComponent } from '../../components/widgets/line-edit/line-edit.component';
import { SpinBoxComponent } from '../../components/widgets/spin-box/spin-box.component';
import { SliderComponent } from '../../components/widgets/slider/slider.component';
import { DialEditComponent } from '../../components/widgets/dial-edit/dial-edit.component';
import { ProgressBarComponent } from '../../components/widgets/progress-bar/progress-bar.component';
import { TabWidgetComponent, TabComponent } from '../../components/widgets/tab-widget/tab-widget.component';
import { TableViewComponent } from '../../components/widgets/table-view/table-view.component';
import { TextEditComponent } from '../../components/widgets/text-edit/text-edit.component';
import { ScrollAreaComponent } from '../../components/widgets/scroll-area/scroll-area.component';
import { ComboBoxComponent } from '../../components/widgets/combo-box/combo-box.component';
import { GroupBoxComponent } from '../../components/widgets/group-box/group-box.component';
import { LabelComponent } from '../../components/widgets/label/label.component';
import { DateTimeEditComponent } from '../../components/widgets/date-time-edit/date-time-edit.component';
import { SimpleTableModel } from '../../core/qtable-model';
import { QProperty } from '../../core/property';

@Component({
  selector: 'app-fusion',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    VBoxLayoutComponent, HBoxLayoutComponent,
    PushButtonComponent, RadioButtonComponent, RadioGroupComponent,
    CheckBoxComponent, LineEditComponent, SpinBoxComponent,
    SliderComponent, DialEditComponent, ProgressBarComponent,
    TabWidgetComponent, TabComponent, TableViewComponent,
    TextEditComponent, ScrollAreaComponent, ComboBoxComponent,
    GroupBoxComponent, LabelComponent, DateTimeEditComponent,
  ],
  templateUrl: './fusion.component.html',
  styles: [`
    :host { display: block; }
  `]
})
export class FusionComponent {
  private router = inject(Router);

  styleItems = ['Fusion', 'Windows', 'macOS', 'Breeze'];
  usePalette = true;
  disableWidgets = false;

  sliderValue = new QProperty(40);
  dialValue = new QProperty(50);
  progress = new QProperty(27);
  spinValue = new QProperty(50);

  tableModel = new SimpleTableModel<{ col1: string; col2: string }>(
    [
      { col1: '', col2: '' },
      { col1: '', col2: '' },
      { col1: '', col2: '' },
      { col1: '', col2: '' },
    ],
    ['col1', 'col2']
  );

  goHome(): void { this.router.navigate(['/']); }
}
