import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { PushButtonComponent } from '../push-button/push-button.component';

@Component({
  selector: 'QButtonGroup',
  standalone: true,
  template: `
    <div class="qt-button-group" [class.qt-disabled]="disabled">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./button-group.component.css']
})
export class ButtonGroupComponent implements AfterContentInit {

  @Input() exclusive = true;
  @Input() disabled = false;

  @Output() buttonClicked = new EventEmitter<number>();
  @Output() buttonToggled = new EventEmitter<{ id: number; checked: boolean }>();

  @ContentChildren(PushButtonComponent)
  buttons!: QueryList<PushButtonComponent>;

  private buttonMap = new Map<PushButtonComponent, number>();
  private checkedStates = new Map<number, boolean>();
  private idCounter = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.initializeButtons();
    
    // Observa mudanças na lista de botões
    this.buttons.changes.subscribe(() => {
      this.initializeButtons();
    });
  }

  private initializeButtons(): void {
    this.buttons.forEach((button) => {
      // Só inicializa se o botão ainda não foi mapeado
      if (!this.buttonMap.has(button)) {
        const id = this.idCounter++;
        this.buttonMap.set(button, id);
        this.checkedStates.set(id, false);

        // Inscreve-se no evento clicked do botão
        button.clicked.subscribe((event) => {
          this.handleButtonClick(id);
        });

        // Aplica estado disabled do grupo
        if (this.disabled) {
          button.disabled = true;
        }

        // Adiciona classe para indicar que está em um grupo
        button.inButtonGroup = true;
      }
    });
  }

  /* Public API */

  setCheckedButton(id: number): void {
    if (!this.exclusive) return;

    this.checkedStates.forEach((_, buttonId) => {
      this.checkedStates.set(buttonId, buttonId === id);
    });

    this.updateButtonVisuals();
  }

  checkedButton(): number | null {
    if (!this.exclusive) return null;

    for (const [id, checked] of this.checkedStates.entries()) {
      if (checked) return id;
    }

    return null;
  }

  setDisabled(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.buttons.forEach(button => {
      button.disabled = isDisabled;
    });
  }

  /* Internal */

  private handleButtonClick(id: number): void {
    if (this.disabled) return;

    if (this.exclusive) {
      // Em modo exclusivo, desmarca todos os outros
      this.checkedStates.forEach((_, buttonId) => {
        this.checkedStates.set(buttonId, buttonId === id);
      });
    } else {
      // Em modo não-exclusivo, apenas toggle o botão clicado
      const currentState = this.checkedStates.get(id) ?? false;
      this.checkedStates.set(id, !currentState);
    }

    this.updateButtonVisuals();
    this.buttonClicked.emit(id);
    this.buttonToggled.emit({ 
      id, 
      checked: this.checkedStates.get(id) ?? false 
    });
  }

  private updateButtonVisuals(): void {
    this.buttonMap.forEach((id, button) => {
      const isChecked = this.checkedStates.get(id) ?? false;
      button.isChecked = isChecked;
    });
    
    this.cdr.detectChanges();
  }
}