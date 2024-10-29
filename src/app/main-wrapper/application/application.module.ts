import { NgModule } from '@angular/core';
import { ApplicationRoutingModule } from './application-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RegisterModule } from '../authentication/register/register.module';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { MainModule } from '../main.module';
import { CoreModule } from '../../core/core.module';
import { ApplicationPageComponent } from './components/application-page/application-page.component';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { ApplicationReviewComponent } from './components/application-review/application-review.component';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ApplicationPageComponent,
    ApplicationReviewComponent
  ],
    imports: [
        ApplicationRoutingModule,
        ReactiveFormsModule,
        MatIcon,
        RegisterModule,
        NgIf,
        NgForOf,
        DatePipe,
        MainModule,
        CoreModule,
        MatCardContent,
        MatCardTitle,
        MatCardHeader,
        MatCard,
        MatTable,
        MatHeaderCell,
        MatCell,
        MatColumnDef,
        MatHeaderRow,
        MatRow,
        MatCellDef,
        MatHeaderCellDef,
        MatHeaderRowDef,
        MatRowDef,
        MatIcon,
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        MatPrefix,
        MatProgressSpinner,
        NgClass,
        MatDatepickerModule,
        MatNativeDateModule,
        TranslateModule,
        // <- Add this he
    ],
})
export class ApplicationModule {
}
