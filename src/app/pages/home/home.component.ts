import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { VBoxLayoutComponent } from '../../components/layouts/vbox-layout/vbox-layout.component';
import { FrameComponent } from '../../components/widgets/frame/frame.component';
import { LabelComponent } from '../../components/widgets/label/label.component';

interface NavItem {
  route: string;
  icon: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    VBoxLayoutComponent,
    FrameComponent,
    LabelComponent,
  ],

  styles: [`
    QFrame { cursor: pointer; }
    QFrame:hover { border-color: var(--color-accent-primary); background: var(--color-bg-hover); }
  `],

  template: `
    <QVBoxLayout [spacing]="8" [margin]="32" [align]="'center'">
      <QLabel [text]="'qt-tauri'" [size]="20" [alignment]="'center'" />
      <QLabel [text]="'Widget library demos'" [alignment]="'center'" />

      <QVBoxLayout [spacing]="10" [margin]="0">
        @for (item of navItems; track item.route) {
          <QFrame shape="box" (click)="navigate(item.route)">
            <QVBoxLayout [spacing]="4">
              <QLabel [text]="item.icon" [size]="20" />
              <QLabel [text]="item.label" [size]="14" />
              <QLabel [text]="item.description" />
            </QVBoxLayout>
          </QFrame>
        }
      </QVBoxLayout>
    </QVBoxLayout>
  `,

})
export class HomeComponent {
  private router = inject(Router);

  readonly navItems: NavItem[] = [
    { route: '/gallery', icon: '⬛', label: 'Widget Gallery', description: 'Buttons, sliders, inputs, progress bars and more' },
    { route: '/fusion', icon: '🪟', label: 'Qt Fusion Demo', description: 'Groups, tabs, table, dial and datetime controls' },
    { route: '/calendar', icon: '📅', label: 'QCalendarWidget', description: 'Month grid and navigation demo' },
    { route: '/command-link-button', icon: '🔗', label: 'QCommandLinkButton', description: 'Title and description button demo' },
  ];

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
