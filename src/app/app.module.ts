import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PasswordFieldComponent } from './components/password-field/password-field.component';
import { StrengthSectionsComponent } from './components/strength-sections/strength-sections.component';
import { StrengthResultComponent } from './components/strength-result/strength-result.component';

@NgModule({
  declarations: [
    AppComponent,
    PasswordFieldComponent,
    StrengthSectionsComponent,
    StrengthResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
