import { GridLayoutComponent } from './components/layouts/grid-layout/grid-layout.component';
import { HBoxLayoutComponent } from './components/layouts/hbox-layout/hbox-layout.component';
import { VBoxLayoutComponent } from './components/layouts/vbox-layout/vbox-layout.component';
import { TabViewComponent } from './components/tab-view/tab-view.component';
import { CalendarWidgetComponent } from './components/widgets/calendar/calendar-widget.component';
import { CentralWidgetComponent } from './components/widgets/central-widget/central-widget.component';
import { CheckBoxComponent } from './components/widgets/check-box/check-box.component';
import { ColorDialogComponent } from './components/widgets/color-dialog/color-dialog.component';
import { ColumnViewComponent } from './components/widgets/column-view/column-view.component';
import { ComboBoxComponent } from './components/widgets/combo-box/combo-box.component';
import { CommandLinkEditComponent } from './components/widgets/command-link-edit/command-link-edit.component';
import { ContextMenuComponent } from './components/widgets/context-menu/context-menu.component';
import { DateEditComponent } from './components/widgets/date-edit/date-edit.component';
import { DateTimeEditComponent } from './components/widgets/date-time-edit/date-time-edit.component';
import { DialEditComponent } from './components/widgets/dial-edit/dial-edit.component';
import { DialogButtonBoxComponent } from './components/widgets/dialog-button-box/dialog-button-box.component';
import { DialogComponent } from './components/widgets/dialog/dialog.component';
import { DoubleSpinBoxComponent } from './components/widgets/double-spin-box/double-spin-box.component';
import { DragComponent } from './components/widgets/drag/drag.component';
import { DropComponent } from './components/widgets/drop/drop.component';
import { EditableComboBoxComponent } from './components/widgets/editable-combo-box/editable-combo-box.component';
import { ErrorMessageComponent } from './components/widgets/error-message/error-message.component';
import { FileDialogComponent } from './components/widgets/file-dialog/file-dialog.component';
import { FontComboboxComponent } from './components/widgets/font-combobox/font-combobox.component';
import { FrameComponent } from './components/widgets/frame/frame.component';
import { IconViewComponent } from './components/widgets/icon-view/icon-view.component';
import { InputDialogComponent } from './components/widgets/input-dialog/input-dialog.component';
import { LabelComponent } from './components/widgets/label/label.component';
import { LineEditComponent } from './components/widgets/line-edit/line-edit.component';
import { LineComponent } from './components/widgets/line/line.component';
import { ListViewComponent } from './components/widgets/list-view/list-view.component';
import { MainWindowComponent } from './components/widgets/main-window/main-window.component';
import { MenuBarComponent } from './components/widgets/menu-bar/menu-bar.component';
import { MenuComponent } from './components/widgets/menu/menu.component';
import { MonthDayEditComponent } from './components/widgets/month-day-edit/month-day-edit.component';
import { ProgressBarComponent } from './components/widgets/progress-bar/progress-bar.component';
import { ProgressDialogComponent } from './components/widgets/progress-dialog/progress-dialog.component';
import { PushButtonComponent } from './components/widgets/push-button/push-button.component';
import { RadioButtonComponent } from './components/widgets/radio-button/radio-button.component';
import { RadioGroupComponent } from './components/widgets/radio-group/radio-group.component';
import { RangeSliderComponent } from './components/widgets/range-slider/range-slider.component';
import { ScrollAreaComponent } from './components/widgets/scroll-area/scroll-area.component';
import { ScrollBarComponent } from './components/widgets/scroll-bar/scroll-bar.component';
import { SeparatorComponent } from './components/widgets/separator/separator.component';
import { ShortcutComponent } from './components/widgets/shortcut/shortcut.component';
import { SliderComponent } from './components/widgets/slider/slider.component';
import { SpinBoxComponent } from './components/widgets/spin-box/spin-box.component';
import { SplitterHandleComponent } from './components/widgets/splitter-handle/splitter-handle.component';
import { SplitterComponent } from './components/widgets/splitter/splitter.component';
import { StackedLayoutItemComponent } from './components/widgets/stacked-layout/stacked-layout.component';
import { StackedWidgetComponent, StackedWidgetPageComponent } from './components/widgets/stacked-widget/stacked-widget.component';
import { StatusBarComponent } from './components/widgets/status-bar/status-bar.component';
import { StatusTipComponent } from './components/widgets/status-tip/status-tip.component';
import { TabComponent, TabWidgetComponent } from './components/widgets/tab-widget/tab-widget.component';
import { TableViewComponent } from './components/widgets/table-view/table-view.component';
import { TextBrowserComponent } from './components/widgets/text-browser/text-browser.component';
import { TextEditComponent } from './components/widgets/text-edit/text-edit.component';
import { ToolBarComponent } from './components/widgets/tool-bar/tool-bar.component';
import { ToolBoxComponent, ToolBoxItemComponent } from './components/widgets/tool-box/tool-box.component';
import { ToolTipComponent } from './components/widgets/tool-tip/tool-tip.component';
import { TreeViewComponent } from './components/widgets/tree-view/tree-view.component';
import { WizardComponent } from './components/widgets/wizard/wizard.component';
import { ButtonGroupComponent } from './components/widgets/button-group/button-group.component';
import { TimeEditComponent } from './components/widgets/time-edit/time-edit.component';
import { QObjectState } from './core/qobjectState';
import { QThread } from './core/qthread';
import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Action } from './core/action';
import { QMessageBox } from './core/message-box';
import { QProperty } from './core/property';
import { DesktopWidgetService } from './services/desktop';
import { Separator } from './core/separator';
import { CommonModule } from '@angular/common';
import { QItemSelectionModel, QModelIndex, SimpleTableModel } from './core/qtable-model';
import { User } from './user';
// import { SystemTrayComponent } from './components/widgets/system-tray-icon/system-tray-icon.component';


export class UserProfileState extends QObjectState {

  name = new QProperty('');
  color = new QProperty('');
  visible = new QProperty(false);
  bio = new QProperty('');
  email = new QProperty('');
  devMode = new QProperty(false);
  open = new QProperty(false);
  logging = new QProperty(false);
  gender = new QProperty<'male' | 'female' | 'other'>('other');
  newsletter = new QProperty<boolean | null>(false);
  age = new QProperty(0);
  volume = new QProperty(50);
  perfLevel = new QProperty(50);

  constructor() { super() }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // RouterOutlet,
    // SystemTrayComponent,
    CommonModule,
    CalendarWidgetComponent,
    ColumnViewComponent,
    CommandLinkEditComponent,
    ContextMenuComponent,
    DialEditComponent,
    DialogComponent,
    DialogButtonBoxComponent,
    DoubleSpinBoxComponent,
    DragComponent,
    DropComponent,
    EditableComboBoxComponent,
    ErrorMessageComponent,
    FileDialogComponent,
    FontComboboxComponent,
    IconViewComponent,
    InputDialogComponent,
    LineComponent,
    ListViewComponent,
    MonthDayEditComponent,
    ProgressDialogComponent,
    RangeSliderComponent,
    ScrollBarComponent,
    ShortcutComponent,
    SplitterComponent,
    SplitterHandleComponent,
    StatusTipComponent,
    TableViewComponent,
    TextBrowserComponent,
    StackedLayoutItemComponent,
    StackedWidgetPageComponent,
    ToolBoxItemComponent,
    ToolBoxComponent,
    StackedWidgetComponent,
    ToolTipComponent,
    TreeViewComponent,
    WizardComponent,
    TabViewComponent,
    GridLayoutComponent,
    // Daqui pra cima
    ColorDialogComponent,
    ButtonGroupComponent,
    ColorDialogComponent,
    DateEditComponent,
    DateTimeEditComponent,
    TimeEditComponent,
    DateTimeEditComponent,
    RadioButtonComponent,
    CheckBoxComponent,
    RadioGroupComponent,
    SpinBoxComponent,
    SliderComponent,
    SeparatorComponent,
    FrameComponent,
    TextEditComponent,
    StatusBarComponent,
    MainWindowComponent,
    ToolBarComponent,
    ScrollAreaComponent,
    ProgressBarComponent,
    LineEditComponent,
    ComboBoxComponent,
    MenuBarComponent,
    CentralWidgetComponent,
    VBoxLayoutComponent,
    HBoxLayoutComponent,
    TabWidgetComponent,
    MenuComponent,
    PushButtonComponent,
    TabComponent,
    LabelComponent
],
  providers: [UserProfileState, QMessageBox],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  @ViewChild('sizeGroup') sizeGroup!: ButtonGroupComponent;

  screen = { width: 0, height: 0 };
  progress = 0;
  sliderValue = 10;
  desktop = inject(DesktopWidgetService);
  cdr = inject(ChangeDetectorRef);
  state = inject(UserProfileState);
  messageBox = inject(QMessageBox);
  worker?: Worker;
  thread = new QThread();
  date = new QProperty<Date>(new Date());

  dateTime = new QProperty<Date>(new Date());
  minDate = new Date(2024, 0, 1, 0, 0);   // 01/01/2024 00:00
  maxDate = new Date(2026, 11, 31, 23, 59); // 31/12/2026 23:59
  
  tab = new QProperty(0);

  tableModel = new SimpleTableModel<User>(
    [
      { id: 1, name: 'Alice', email: 'alice@mail.com', age: 28 },
      { id: 2, name: 'Bob', email: 'bob@mail.com', age: 35 },
      { id: 3, name: 'Carol', email: 'carol@mail.com', age: 22 },
    ],
    ['id', 'name', 'email', 'age']
  );
  
  separator = new Separator();

  newAction = new Action({
    text: 'New',
    handler: () => console.log('New clicked'),
    icon: 'assets/new.png'
  });

  openAction = new Action({
    text: 'Open',
    handler: () => console.log('Open clicked'),
    icon: 'assets/open.png'
  });

  saveAction = new Action({
    text: 'Save',
    handler: () => this.save(),
    icon: 'assets/save.png'
  });

  exitAction = new Action({
    text: 'Exit',
    handler: () => console.log('Exit clicked'),
    icon: 'assets/exit.png'
  });

  boldAction = new Action({
    text: 'Bold',
    checkable: true,
    handler: () => console.log('Bold toggled')
  });

  italicAction = new Action({
    text: 'Italic',
    checkable: true,
    handler: () => console.log('Italic toggled')
  });

  ngOnInit() {
    this.screen = this.desktop.screenGeometry();
    this.desktop.screenGeometryChanges().subscribe(geom => {
      this.screen = geom;
    });
  }

  async save() {
    console.log('Form saved', this.state);
    const payload = this.state.toObject()
    const json = JSON.stringify(payload)
    await this.messageBox.information('Success', `Saved successfully: ${json}`);
  }

  async deleteProfile() {
    await this.messageBox.question('Confirm', 'Delete profile?');
  }

  reset() { this.state.reset() }

  onActivate() {}

  useThread() {
    this.thread.start(300_000_000, (result) => {
      console.log('Thread finished with result:', result);
    });
  }

  toString(screen: { width: number, height: number }) {
    return `(${screen.width}, ${screen.height})`
  }

  onButtonClick(event: any) {

  }

  onAlignmentChange(buttonId: number): void {
    console.log('Botão clicado:', buttonId);
  }

  onAlignmentToggled(event: { id: number; checked: boolean }): void {
    console.log('Botão toggled:', event);
  }

  onStyleClick(buttonId: number): void {
    console.log('Estilo clicado:', buttonId);
  } 

  setMediumSize(): void {
    this.sizeGroup.setCheckedButton(1); // Seleciona o segundo botão (índice 1)
  }

  getCurrentAlignment(): number | null {
    return this.sizeGroup.checkedButton();
  }

  onAccepted() {
    console.log('Color selected:', this.state.color.value)
  }

  onRejected() {
    this.state.color.value = ''
  }

  onDateTimeChanged(e: any) {
    console.log(e)
  }

  onDateChanged(e: any) {
    console.log(e)
  }

  onTimeChanged(e: any) {
    console.log(e)
  }

  onColorSelected(color: string) {
    this.state.color.value = color
  }

  onActivated(index: QModelIndex) {
    console.log('Activated:', index);
    console.log(
      'Value:',
      this.tableModel.data(index.row, index.column)
    );
  }

}
