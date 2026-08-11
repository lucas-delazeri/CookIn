import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {
  @Output("navigate") onNavigate = new EventEmitter();

  navigate() {
    this.onNavigate.emit();
  }
}
