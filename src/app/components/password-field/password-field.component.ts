import { Component } from '@angular/core';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.css']
})
export class PasswordFieldComponent {
  password: string = '';
  showPassword: boolean = false;

  constructor(private readonly passwordService: PasswordService) { }

  changePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  passwordChanged(value: string): void {
    this.passwordService.updPasswordStrength(value);
  }
}
