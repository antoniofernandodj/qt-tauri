import { GridLayoutComponent } from '../../components/layouts/grid-layout/grid-layout.component';
import { HBoxLayoutComponent } from '../../components/layouts/hbox-layout/hbox-layout.component';
import { VBoxLayoutComponent } from '../../components/layouts/vbox-layout/vbox-layout.component';
import { CalendarWidgetComponent } from '../../components/widgets/calendar/calendar-widget.component';
import { CentralWidgetComponent } from '../../components/widgets/central-widget/central-widget.component';
import { CheckBoxComponent } from '../../components/widgets/check-box/check-box.component';
import { ColorDialogComponent } from '../../components/widgets/color-dialog/color-dialog.component';
import { ColumnViewComponent } from '../../components/widgets/column-view/column-view.component';
import { ComboBoxComponent } from '../../components/widgets/combo-box/combo-box.component';
import { CommandLinkButtonComponent } from '../../components/widgets/command-link-button/command-link-button.component';
import { ContextMenuComponent } from '../../components/widgets/context-menu/context-menu.component';
import { DateEditComponent } from '../../components/widgets/date-edit/date-edit.component';
import { DateTimeEditComponent } from '../../components/widgets/date-time-edit/date-time-edit.component';
import { DialEditComponent } from '../../components/widgets/dial-edit/dial-edit.component';
import { DialogButtonBoxComponent } from '../../components/widgets/dialog-button-box/dialog-button-box.component';
import { DialogComponent } from '../../components/widgets/dialog/dialog.component';
import { DoubleSpinBoxComponent } from '../../components/widgets/double-spin-box/double-spin-box.component';
import { DragComponent } from '../../components/widgets/drag/drag.component';
import { DropComponent } from '../../components/widgets/drop/drop.component';
import { EditableComboBoxComponent } from '../../components/widgets/editable-combo-box/editable-combo-box.component';
import { ErrorMessageComponent } from '../../components/widgets/error-message/error-message.component';
import { FileDialogComponent } from '../../components/widgets/file-dialog/file-dialog.component';
import { FontComboboxComponent } from '../../components/widgets/font-combobox/font-combobox.component';
import { FrameComponent } from '../../components/widgets/frame/frame.component';
import { IconViewComponent } from '../../components/widgets/icon-view/icon-view.component';
import { InputDialogComponent } from '../../components/widgets/input-dialog/input-dialog.component';
import { LabelComponent } from '../../components/widgets/label/label.component';
import { LineEditComponent } from '../../components/widgets/line-edit/line-edit.component';
import { LineComponent } from '../../components/widgets/line/line.component';
import { ListViewComponent } from '../../components/widgets/list-view/list-view.component';
import { MainWindowComponent } from '../../components/widgets/main-window/main-window.component';
import { MenuBarComponent } from '../../components/widgets/menu-bar/menu-bar.component';
import { MenuComponent } from '../../components/widgets/menu/menu.component';
import { MonthDayEditComponent } from '../../components/widgets/month-day-edit/month-day-edit.component';
import { ProgressBarComponent } from '../../components/widgets/progress-bar/progress-bar.component';
import { ProgressDialogComponent } from '../../components/widgets/progress-dialog/progress-dialog.component';
import { PushButtonComponent } from '../../components/widgets/push-button/push-button.component';
import { RadioButtonComponent } from '../../components/widgets/radio-button/radio-button.component';
import { RadioGroupComponent } from '../../components/widgets/radio-group/radio-group.component';
import { RangeSliderComponent } from '../../components/widgets/range-slider/range-slider.component';
import { ScrollAreaComponent } from '../../components/widgets/scroll-area/scroll-area.component';
import { ScrollBarComponent } from '../../components/widgets/scroll-bar/scroll-bar.component';
import { SeparatorComponent } from '../../components/widgets/separator/separator.component';
import { ShortcutComponent } from '../../components/widgets/shortcut/shortcut.component';
import { SliderComponent } from '../../components/widgets/slider/slider.component';
import { SpinBoxComponent } from '../../components/widgets/spin-box/spin-box.component';
import { SplitterHandleComponent } from '../../components/widgets/splitter-handle/splitter-handle.component';
import { SplitterComponent, SplitterPaneComponent } from '../../components/widgets/splitter/splitter.component';
import { StackedLayoutItemComponent } from '../../components/widgets/stacked-layout/stacked-layout.component';
import { StackedWidgetComponent, StackedWidgetPageComponent } from '../../components/widgets/stacked-widget/stacked-widget.component';
import { StatusBarComponent } from '../../components/widgets/status-bar/status-bar.component';
import { StatusTipComponent } from '../../components/widgets/status-tip/status-tip.component';
import { TabComponent, TabWidgetComponent } from '../../components/widgets/tab-widget/tab-widget.component';
import { TableViewComponent } from '../../components/widgets/table-view/table-view.component';
import { TextBrowserComponent } from '../../components/widgets/text-browser/text-browser.component';
import { TextEditComponent } from '../../components/widgets/text-edit/text-edit.component';
import { ToolBarComponent } from '../../components/widgets/tool-bar/tool-bar.component';
import { ToolBoxComponent, ToolBoxItemComponent } from '../../components/widgets/tool-box/tool-box.component';
import { ToolTipComponent } from '../../components/widgets/tool-tip/tool-tip.component';
import { TreeViewComponent } from '../../components/widgets/tree-view/tree-view.component';
import { WizardComponent } from '../../components/widgets/wizard/wizard.component';
import { ButtonGroupComponent } from '../../components/widgets/button-group/button-group.component';
import { TimeEditComponent } from '../../components/widgets/time-edit/time-edit.component';
import { SafeAreaComponent } from '../../components/widgets/safe-area/safe-area.component';
import { Component, OnInit, inject } from '@angular/core';
import { QMessageBox } from '../../core/message-box';
import { QProperty } from '../../core/property';
import { QObjectState } from '../../core/qobjectState';
import { Validators } from '../../core/validators';
import { CommonModule } from '@angular/common';
import { invoke } from '@tauri-apps/api/core';
import { RouterLink } from '@angular/router';

class LoginFormState extends QObjectState {
  username = new QProperty('', [Validators.required, Validators.minLength(3)]);
  email    = new QProperty('', [Validators.required, Validators.email]);
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CalendarWidgetComponent, ColumnViewComponent, CommandLinkButtonComponent,
    ContextMenuComponent, DialEditComponent, DialogComponent,
    DialogButtonBoxComponent, DoubleSpinBoxComponent, EditableComboBoxComponent,
    ErrorMessageComponent, FileDialogComponent, FontComboboxComponent,
    IconViewComponent, InputDialogComponent, LineComponent, ListViewComponent,
    MonthDayEditComponent, ProgressDialogComponent, RangeSliderComponent,
    ScrollBarComponent, ShortcutComponent, SplitterHandleComponent,
    StatusTipComponent, TextBrowserComponent, StackedLayoutItemComponent,
    ToolTipComponent, TreeViewComponent, WizardComponent,
    DragComponent, DropComponent, SplitterPaneComponent, SplitterComponent,
    SafeAreaComponent, GridLayoutComponent, StackedWidgetPageComponent,
    TableViewComponent, ToolBoxItemComponent, ToolBoxComponent,
    StackedWidgetComponent, ColorDialogComponent, ButtonGroupComponent,
    DateEditComponent, DateTimeEditComponent, TimeEditComponent,
    RadioButtonComponent, CheckBoxComponent, RadioGroupComponent,
    SpinBoxComponent, SliderComponent, SeparatorComponent, FrameComponent,
    TextEditComponent, StatusBarComponent, MainWindowComponent, ToolBarComponent,
    ScrollAreaComponent, ProgressBarComponent, LineEditComponent,
    ComboBoxComponent, MenuBarComponent, CentralWidgetComponent,
    VBoxLayoutComponent, HBoxLayoutComponent, TabWidgetComponent, MenuComponent,
    PushButtonComponent, TabComponent, LabelComponent,
  ],
  providers: [QMessageBox, LoginFormState],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {

  qProperty(item: any) { return new QProperty(item); }

  selectedDate = new QProperty<Date>(new Date());
  stacked: string | null = null;
  number = new QProperty('0');
  op: string | null = null;

  loginForm  = inject(LoginFormState);
  msgBox     = inject(QMessageBox);

  async submitForm(): Promise<void> {
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.isValid) {
      await this.msgBox.warning('Formulário inválido', 'Corrija os erros antes de enviar.');
      return;
    }
    const { username, email } = this.loginForm.toObject();
    await this.msgBox.information('Enviado', `Usuário: ${username}\nEmail: ${email}`);
    this.loginForm.reset();
  }

  resetForm(): void { this.loginForm.reset(); }

  clear() { this.number.value = '0'; this.stacked = null; }

  async ngOnInit() {}
}
