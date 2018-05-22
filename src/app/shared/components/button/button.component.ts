import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'kp-button',
  template: `
    <section
      class="btn btn-primary btn-l"
      [class.loading]="isLoading"
      (click)="clicked.emit()">

      <span *ngIf="isLoading" class="loader"></span>
      <span class="label">{{ isLoading ? 'Loading...' : label }}</span>
    </section>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() label: string;
  @Input() isLoading: string;

  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  onClick() {
    this.clicked.emit();
  }

}
