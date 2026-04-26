import { Component, Input } from '@angular/core';

@Component({
  selector: 'QErrorMessage',
  standalone: true,
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {
  @Input() message: string | null = null;
}
