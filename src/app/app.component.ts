import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridLayoutComponent } from './components/layouts/grid-layout/grid-layout.component';
import { HBoxLayoutComponent } from './components/layouts/hbox-layout/hbox-layout.component';
import { VBoxLayoutComponent } from './components/layouts/vbox-layout/vbox-layout.component';
import { TabViewComponent } from './components/tab-view/tab-view.component';
import { CentralWidgetComponent } from './components/widgets/central-widget/central-widget.component';
import { CheckBoxComponent } from './components/widgets/check-box/check-box.component';
import { ComboBoxComponent } from './components/widgets/combo-box/combo-box.component';
import { FrameComponent } from './components/widgets/frame/frame.component';
import { LabelComponent } from './components/widgets/label/label.component';
import { LineEditComponent } from './components/widgets/line-edit/line-edit.component';
import { MainWindowComponent } from './components/widgets/main-window/main-window.component';
import { MenuBarComponent } from './components/widgets/menu-bar/menu-bar.component';
import { MenuComponent } from './components/widgets/menu/menu.component';
import { MessageBoxComponent } from './components/widgets/message-box/message-box.component';
import { ProgressBarComponent } from './components/widgets/progress-bar/progress-bar.component';
import { PushButtonComponent } from './components/widgets/push-button/push-button.component';
import { RadioButtonComponent } from './components/widgets/radio-button/radio-button.component';
import { RadioGroupComponent } from './components/widgets/radio-group/radio-group.component';
import { ScrollAreaComponent } from './components/widgets/scroll-area/scroll-area.component';
import { SeparatorComponent } from './components/widgets/separator/separator.component';
import { SliderComponent } from './components/widgets/slider/slider.component';
import { SpinBoxComponent } from './components/widgets/spin-box/spin-box.component';
import { StatusBarComponent } from './components/widgets/status-bar/status-bar.component';
import { TabComponent, TabWidgetComponent } from './components/widgets/tab-widget/tab-widget.component';
import { TextEditComponent } from './components/widgets/text-edit/text-edit.component';
import { ToolBarComponent } from './components/widgets/tool-bar/tool-bar.component';
import { Action } from './core/action';
import { QMessageBox } from './core/message-box';
import { QProperty } from './core/property';
import { Separator } from './core/separator';
import { DesktopWidgetService } from './services/desktop';
// import { SystemTrayComponent } from './components/widgets/system-tray-icon/system-tray-icon.component';


export class UserProfileState {

  name = new QProperty('');
  bio = new QProperty('');
  email = new QProperty('');
  devMode = new QProperty(false);
  logging = new QProperty(false);
  gender = new QProperty<'male' | 'female' | 'other'>('other');
  newsletter = new QProperty<boolean | null>(false);
  age = new QProperty(0);
  volume = new QProperty(50);
  perfLevel = new QProperty(50);

  reset() {
    this.name.value = '';
    this.bio.value = '';
    this.logging.value = false;
    this.devMode.value = false;
    this.email.value = '';
    this.gender.value = 'other';
    this.newsletter.value = false;
    this.age.value = 0;
    this.volume.value = 50;
    this.perfLevel.value = 50;
  }

  toObject() {
    const payload = {
      name: this.name.value,
      email: this.email.value,
      bio: this.bio.value,
      gender: this.gender.value,
      newsletter: this.newsletter.value,
      age: this.age.value,
      volume: this.volume.value,
      perfLevel: this.perfLevel.value,
      devMode: this.devMode.value,
      logging: this.logging.value
    };
    return payload
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    // RouterOutlet,
    ReactiveFormsModule,
    RadioButtonComponent,
    CheckBoxComponent,
    RadioGroupComponent,
    SpinBoxComponent,
    SliderComponent,
    SeparatorComponent,
    FrameComponent,
    TextEditComponent,
    FormsModule,
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
    MessageBoxComponent,
    TabViewComponent,
    GridLayoutComponent,
    // SystemTrayComponent,
    LabelComponent
],
  providers: [UserProfileState, QMessageBox],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  screen = { width: 0, height: 0 };
  progress = 0;
  sliderValue = 10;
  desktop = inject(DesktopWidgetService);
  cdr = inject(ChangeDetectorRef);
  state = inject(UserProfileState);
  messageBox = inject(QMessageBox);

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

  toString(screen: { width: number, height: number }) {
    return `(${screen.width}, ${screen.height})`
  }
}
