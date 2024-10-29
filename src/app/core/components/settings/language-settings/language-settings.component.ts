import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-settings',
  templateUrl: './language-settings.component.html',
  styleUrl: './language-settings.component.scss'
})
export class LanguageSettingsComponent implements OnInit {
  selectedLanguage: string = 'en';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { changeLanguage: (lang: string) => void },
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = this.translate.currentLang || 'en';
  }

  onLanguageChange(language: string): void {
      this.data.changeLanguage(language);
  }
}
