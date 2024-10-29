import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { AdvancedInfoComponent } from './advanced-info/advanced-info.component';
import { CoreModule } from '../../core/core.module';
import { UserWrapperComponent } from './user-wrapper/user-wrapper.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {
  EditProfileImageDialogComponent
} from './components/dialogs/edit-profile-image-dialog/edit-profile-image-dialog.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UserWrapperComponent,
    BasicInfoComponent,
    AdvancedInfoComponent,
    EditProfileImageDialogComponent
  ],
    imports: [
        UserRoutingModule,
        ReactiveFormsModule,
        CoreModule,
        MatIcon,
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        NgIf,
        MatFormField,
        MatInput,
        MatCardContent,
        MatCardTitle,
        MatCardHeader,
        MatCard,
        MatLabel,
        MatPrefix,
        MatIconModule,
        MatButtonModule,
        MatCheckbox,
        TranslateModule,
    ],
})
export class UserModule {
}
