import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Colors } from 'src/app/enums/colors';
import { Strength } from 'src/app/enums/strength';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-strength-sections',
  templateUrl: './strength-sections.component.html',
  styleUrls: ['./strength-sections.component.css']
})
export class StrengthSectionsComponent implements OnInit, OnDestroy {
  easySectionColor: string = '';
  mediumSectionColor: string = '';
  strongSectionColor: string = '';

  private destroySubject = new Subject();

  constructor(private readonly passwordService: PasswordService) {}

  ngOnInit(): void {
    this.setSectionsColor(Colors.Gray);
    this.passwordService.passwordStrength
    .pipe(takeUntil(this.destroySubject))
    .subscribe(
      res => this.updateSections(res)
    );
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

  private updateSections(strength: Strength): void {
    switch (strength) {
      case Strength.None:
        this.setSectionsColor(Colors.Gray);
        break;
      case Strength.Short:
        this.setSectionsColor(Colors.Red);
        break;
      case Strength.Easy:
        this.setSectionColors(Colors.Red, Colors.Gray, Colors.Gray);
        break;
      case Strength.Medium:
        this.setSectionColors(Colors.Yellow, Colors.Yellow, Colors.Gray);
        break;
      case Strength.Strong:
        this.setSectionsColor(Colors.Green);
        break;
    }
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
