import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { MatIcon } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DeleteDialogComponent } from './components/dialog/delete-dialog/delete-dialog.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { LanguageSettingsComponent } from './components/settings/language-settings/language-settings.component';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FooterComponent,
    DeleteDialogComponent,
    NavComponent,
    LanguageSettingsComponent
  ],
  imports: [
    MatIcon,
    SharedModule,
    RouterLink,
    RouterLinkActive,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatMenu,
    MatMenuItem,
    MatIconButton,
    MatMenuTrigger,
    MatRadioGroup,
    MatRadioButton,
    MatDialogClose,
    TranslateModule,
    FormsModule
  ],
  exports: [
    FooterComponent,
    NavComponent,
  ]
})
export class CoreModule { }
