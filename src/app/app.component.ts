import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PasswordService } from './services/password.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public readonly passwordControl = new FormControl();

  constructor(passwordService: PasswordService) {
    this.passwordControl.valueChanges.subscribe(
      value => passwordService.updPasswordStrength(value)
    );
  }
}
