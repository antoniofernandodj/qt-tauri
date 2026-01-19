import { Component } from '@angular/core';

@Component({
  selector: 'QCentralWidget',
  standalone: true,
  template: `
    <div class="qt-central-widget">
        <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./central-widget.component.css']
})
export class CentralWidgetComponent {}
