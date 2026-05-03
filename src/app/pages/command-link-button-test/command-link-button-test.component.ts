import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CommandLinkButtonComponent } from '../../components/widgets/command-link-button/command-link-button.component';
import { VBoxLayoutComponent } from '../../components/layouts/vbox-layout/vbox-layout.component';
import { HBoxLayoutComponent } from '../../components/layouts/hbox-layout/hbox-layout.component';
import { GroupBoxComponent } from '../../components/widgets/group-box/group-box.component';
import { LabelComponent } from '../../components/widgets/label/label.component';
import { PushButtonComponent } from '../../components/widgets/push-button/push-button.component';

@Component({
  selector: 'app-command-link-button-test',
  standalone: true,
  imports: [
    CommonModule,
    CommandLinkButtonComponent,
    VBoxLayoutComponent,
    HBoxLayoutComponent,
    GroupBoxComponent,
    LabelComponent,
    PushButtonComponent
  ],
  template: `
    <QPushButton text="← Back to Home" kind="ghost" (clicked)="goHome()" />
    
    <div style="padding: 20px;">
      <QVBoxLayout [spacing]="20">
        <QGroupBox title="Standard Command Link Buttons">
          <QVBoxLayout [spacing]="10">
            <QCommandLinkButton 
              text="Network and Internet" 
              description="Connect to the Internet, and set up your network."
              (clicked)="onClicked('Network')"
            ></QCommandLinkButton>
            
            <QCommandLinkButton 
              text="Hardware and Sound" 
              description="View and manage hardware, and adjust sound settings."
              (clicked)="onClicked('Hardware')"
            ></QCommandLinkButton>
            
            <QCommandLinkButton 
              text="User Accounts" 
              description="Change user account settings and passwords for people who share this computer."
              (clicked)="onClicked('Accounts')"
            ></QCommandLinkButton>
          </QVBoxLayout>
        </QGroupBox>

        <QHBoxLayout [spacing]="20">
          <QGroupBox title="Flat Style" [flex]="1">
            <QVBoxLayout [spacing]="10">
              <QCommandLinkButton 
                text="Flat Button" 
                description="This button is flat until you hover over it."
                [flat]="true"
              ></QCommandLinkButton>
            </QVBoxLayout>
          </QGroupBox>

          <QGroupBox title="Disabled State" [flex]="1">
            <QVBoxLayout [spacing]="10">
              <QCommandLinkButton 
                text="Disabled Button" 
                description="You cannot click this button."
                [disabled]="true"
              ></QCommandLinkButton>
            </QVBoxLayout>
          </QGroupBox>
        </QHBoxLayout>

        <QGroupBox title="Custom Icons">
          <QVBoxLayout [spacing]="10">
            <QCommandLinkButton 
              text="Settings" 
              description="Configure your system preferences."
              icon="assets/tools.png"
            ></QCommandLinkButton>
          </QVBoxLayout>
        </QGroupBox>

        <QLabel [text]="lastClicked"></QLabel>
      </QVBoxLayout>
    </div>
  `
})
export class CommandLinkButtonTestComponent {
  private router = inject(Router);
  lastClicked = 'Click a button to see its ID.';

  goHome(): void { this.router.navigate(['/']); }

  onClicked(id: string): void {
    this.lastClicked = 'Last clicked: ' + id;
  }
}
