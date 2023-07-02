import { Component } from '@angular/core';
import { Colors } from './enums/colors';
import { Strength } from './enums/strength';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private readonly hasDigitsRegExp = /\d+/;
  private readonly hasLettersRegExp = /[a-zA-Z]+/
  private readonly hasSymbolsRegExp = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/;

  password: string = '';
  showPassword: boolean = false;

  result: Strength = Strength.None;
  strengthEnum: typeof Strength = Strength;

  easySectionColor: string = '';
  mediumSectionColor: string = '';
  strongSectionColor: string = '';

  constructor() {
    this.setSectionsColor(Colors.Gray);
  }

  changePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  passwordChanged(val: string): void {
    const minLen = 8;
    val = val.trim();

    if (val.length == 0) {
      this.result = Strength.None;
      this.setSectionsColor(Colors.Gray);
    } else if (val.length < minLen) {
      this.result = Strength.None;
      this.setSectionsColor(Colors.Red);
    } else if (this.passwordIsStrong(val)) {
      this.result = Strength.Strong;
      this.setSectionsColor(Colors.Green);
    } else if (this.passwordIsMedium(val)) {
      this.result = Strength.Medium;
      this.setSectionColors(Colors.Yellow, Colors.Yellow, Colors.Gray);
    } else {
      this.result = Strength.Easy;
      this.setSectionColors(Colors.Red, Colors.Gray, Colors.Gray);
    }
  }

  private passwordIsStrong(val: string): boolean {
    return this.hasLettersRegExp.test(val)
    && this.hasSymbolsRegExp.test(val)
    && this.hasDigitsRegExp.test(val);
  }

  private passwordIsMedium(val: string): boolean {
    return this.hasLettersRegExp.test(val) && this.hasSymbolsRegExp.test(val)
      || this.hasLettersRegExp.test(val) && this.hasDigitsRegExp.test(val)
      || this.hasDigitsRegExp.test(val) && this.hasSymbolsRegExp.test(val);
  }

  private setSectionColors(
    color1: string, color2: string, color3: string): void {
      this.easySectionColor = color1;
      this.mediumSectionColor = color2;
      this.strongSectionColor = color3;
  }

  private setSectionsColor(color: string): void {
    this.setSectionColors(color, color, color);
  }
}
