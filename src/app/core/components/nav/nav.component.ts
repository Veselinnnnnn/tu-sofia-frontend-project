import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LanguageSettingsComponent } from '../settings/language-settings/language-settings.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  isLoggedIn: boolean = false;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('token');
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

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

}
