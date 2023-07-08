import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PasswordFieldComponent),
    multi: true
  }]
})
export class PasswordFieldComponent implements OnInit, ControlValueAccessor {
  public readonly passwordControl = new FormControl();

  showPassword: boolean = false;

  private onChange = (_: string | null) => undefined;
  private onTouched = () => undefined;

  ngOnInit(): void {
    this.passwordControl.valueChanges
    .subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });
  }

  writeValue(value: string | null): void {
    this.passwordControl.setValue(value?.trim());
  }

  registerOnChange(fn: (value: string | null) => undefined): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => undefined): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.passwordControl.disable();
    } else {
      this.passwordControl.enable();
    }
  }

  changePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
