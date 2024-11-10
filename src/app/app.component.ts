import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './core/services/utils/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-project';

  constructor(
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
  ) {
    const savedLanguage = this.localStorageService.get('language') || 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(savedLanguage);

  }
}
