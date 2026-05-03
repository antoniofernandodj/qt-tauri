import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
    DialEditComponent,
    DateTimeEditComponent,
    DateEditComponent,
    ContextMenuComponent,
    CommandLinkButtonComponent,
    ComboBoxComponent,
    ColumnViewComponent,
    ColorDialogComponent,
    CheckBoxComponent,
    GridLayoutComponent,
    HBoxLayoutComponent,
    VBoxLayoutComponent,
    CalendarWidgetComponent,
    CentralWidgetComponent,
    DialogButtonBoxComponent,
    DialogComponent,
    DoubleSpinBoxComponent,
    DragComponent,
    DropComponent,
    EditableComboBoxComponent,
    ErrorMessageComponent,
    FileDialogComponent,
    FontComboboxComponent,
    FrameComponent,
    IconViewComponent,
    InputDialogComponent,
    LabelComponent,
    LineEditComponent,
    LineComponent,
    ListViewComponent,
    MainWindowComponent,
    MenuBarComponent,
    MenuComponent,
    MonthDayEditComponent,
    ProgressBarComponent,
    ProgressDialogComponent,
    PushButtonComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    RangeSliderComponent,
    ScrollAreaComponent,
    ScrollBarComponent,
    SeparatorComponent,
    ShortcutComponent,
    SliderComponent,
    SpinBoxComponent,
    StatusBarComponent,
    StatusTipComponent,
    TabComponent,
    TabWidgetComponent,
    TableViewComponent,
    TextBrowserComponent,
    TextEditComponent,
    ToolBarComponent,
    ToolBoxComponent,
    ToolBoxItemComponent,
    ToolTipComponent,
    TreeViewComponent,
    WizardComponent,
    ButtonGroupComponent,
    TimeEditComponent,
    SplitterHandleComponent,
    SplitterComponent,
    SplitterPaneComponent,
    StackedLayoutItemComponent,
    StackedWidgetPageComponent,
    SafeAreaComponent,
    StackedWidgetComponent
} from '../../components/qt-widgets';

import {
  QMessageBox,
  QObjectState,
  QProperty,
  Validators
} from '../../core/index';



class LoginFormState extends QObjectState {
  username = new QProperty('', [Validators.required, Validators.minLength(3)]);
  email = new QProperty('', [Validators.required, Validators.email]);
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
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

  private router = inject(Router);

  qProperty(item: any) { return new QProperty(item); }

  selectedDate = new QProperty<Date>(new Date());
  stacked: string | null = null;
  number = new QProperty('0');
  op: string | null = null;

  constructor(protected loginForm: LoginFormState, private msgBox: QMessageBox) {}

  goHome(): void { this.router.navigate(['/']); }

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

