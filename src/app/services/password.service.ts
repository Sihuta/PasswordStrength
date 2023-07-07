import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Strength } from '../enums/strength';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private readonly hasDigitsRegExp = /\d+/;
  private readonly hasLettersRegExp = /[a-zA-Z]+/
  private readonly hasSymbolsRegExp = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/;

  private _passwordStrength = new Subject<Strength>();
  public passwordStrength = this._passwordStrength.asObservable();

  updPasswordStrength(password: string): void {
    const minLen = 8;
    password = password.trim();

    if (password.length == 0) {
      this.setPasswordStrength(Strength.None);
    } else if (password.length < minLen) {
      this.setPasswordStrength(Strength.Short);
    } else if (this.passwordIsStrong(password)) {
      this.setPasswordStrength(Strength.Strong);
    } else if (this.passwordIsMedium(password)) {
      this.setPasswordStrength(Strength.Medium);
    } else {
      this.setPasswordStrength(Strength.Easy);
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

  private setPasswordStrength(strength: Strength): void {
    this._passwordStrength.next(strength);
  }
}
