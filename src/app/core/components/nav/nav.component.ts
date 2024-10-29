import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LanguageSettingsComponent } from '../settings/language-settings/language-settings.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService,
  ) {
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(savedLanguage);
  }

  protected navigateToAvailableAnimals() {
    this.router.navigateByUrl('/available-animals');
  }

  protected navigateToUser() {
    this.router.navigateByUrl('/user');
  }

  openLanguageSettings(): void {
    this.dialog.open(LanguageSettingsComponent, {
      width: '400px',
      data: {
        changeLanguage: this.changeLanguage.bind(this)
      }
    });
  }

  private changeLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }
}
