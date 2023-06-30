import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  password: string = '';
  showPassword: boolean = false;

  changePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
