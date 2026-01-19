import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'QFrame',
  standalone: true,
  imports: [NgIf],
  template: `
    <div
      [class]="frameClass"
      [style]="frameStyle">
      
      <!-- HLine -->
      <div *ngIf="shape === 'hline'" class="qt-separator-horizontal"></div>
      
      <!-- VLine -->
      <div *ngIf="shape === 'vline'" class="qt-separator-vertical"></div>
      
      <!-- Box / Panel -->
      <div *ngIf="shape === 'box' || shape === 'panel'">
        <ng-content></ng-content>
      </div>
      
    </div>
  `,
  styles: [`
    .qt-frame-box {
      background-color: var(--color-bg-primary);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: 16px;
      box-shadow: var(--shadow-xs);
    }
    
    .qt-frame-panel {
      background-color: var(--color-bg-secondary);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: 16px;
    }
    
    .qt-frame-sunken {
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .qt-frame-raised {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .qt-separator-horizontal {
      width: 100%;
      height: 1px;
      margin: 16px 0;
      background: linear-gradient(90deg, transparent, var(--color-border-light), transparent);
    }
    
    .qt-separator-vertical {
      width: 1px;
      height: 100%;
      margin: 0 16px;
      background: linear-gradient(180deg, transparent, var(--color-border-light), transparent);
    }
  `]
})
export class FrameComponent {

  @Input() shape: 'hline' | 'vline' | 'box' | 'panel' = 'box';
  @Input() shadow: 'plain' | 'sunken' | 'raised' = 'plain';
  @Input() lineWidth = 1;
  @Input() margin = 16;

  get frameClass(): string {
    const classes = [];
    
    if (this.shape === 'box') classes.push('qt-frame-box');
    if (this.shape === 'panel') classes.push('qt-frame-panel');
    if (this.shadow === 'sunken') classes.push('qt-frame-sunken');
    if (this.shadow === 'raised') classes.push('qt-frame-raised');
    
    return classes.join(' ');
  }

  get frameStyle(): string {
    if (this.shape === 'box' || this.shape === 'panel') {
      return `padding: ${this.margin}px;`;
    }
    return '';
  }
}
