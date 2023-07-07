import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Strength } from 'src/app/enums/strength';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-strength-result',
  templateUrl: './strength-result.component.html',
  styleUrls: ['./strength-result.component.css']
})
export class StrengthResultComponent implements OnInit, OnDestroy {
  private readonly defaultExplanation = 'It is empty';

  result = Strength.None;
  strengthEnum: typeof Strength = Strength;
  explanation = this.defaultExplanation;

  private destroySubject = new Subject();

  constructor(private readonly passwordService: PasswordService) { }

  ngOnInit(): void {
    this.passwordService.passwordStrength
    .pipe(takeUntil(this.destroySubject))
    .subscribe(
      res => this.updateStrengthResult(res)
    );
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

  private updateStrengthResult(strength: Strength): void {
    this.result = strength;
    switch (strength) {
      case Strength.None:
        this.setResultExpl(this.defaultExplanation);
        break;
      case Strength.Short:
        this.setResultExpl('It has less than 8 characters');
        break;
      case Strength.Easy:
        this.setResultExpl('It has only letters/digits/symbols');
        break;
      case Strength.Medium:
        this.setResultExpl('It has letters-symbols/letters-digits/digits-symbols');
        break;
      case Strength.Strong:
        this.setResultExpl('It has letters, symbols and numbers');
        break;
    }
  }

  private setResultExpl(expl: string): void {
    this.explanation = expl;
  }
}
