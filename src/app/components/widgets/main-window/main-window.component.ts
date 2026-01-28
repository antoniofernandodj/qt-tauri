import { Component } from '@angular/core';
import { SafeAreaComponent } from "../safe-area/safe-area.component";

@Component({
  selector: 'QMainWindow',
  standalone: true,
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css'],
  imports: [SafeAreaComponent]
})
export class MainWindowComponent {}
