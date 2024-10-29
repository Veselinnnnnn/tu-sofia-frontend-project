import { NgModule } from '@angular/core';
import { AvailableAnimalsRoutingModule } from './available-animals-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RegisterModule } from '../authentication/register/register.module';
import { DatePipe, NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { AnimalShelterComponent } from './components/animal-shelter/animal-shelter.component';
import { HomeModule } from '../home/home.module';
import { CoreModule } from '../../core/core.module';
import { ViewAnimalShelterComponent } from './components/view-animal-shelter/view-animal-shelter.component';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatFormField, MatFormFieldModule, MatHint, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { AddCommentDialogComponent } from './components/add-comment-dialog/add-comment-dialog.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { RequestWalkComponent } from './components/request-walk/request-walk.component';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatTimepickerComponent, NgxMatTimepickerDirective } from 'ngx-mat-timepicker';
import { RequestAdoptionComponent } from './components/request-adoption/request-adoption.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CreateAnimalComponent } from './components/dialogs/create-animal/create-animal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AnimalShelterComponent,
    ViewAnimalShelterComponent,
    AnimalCardComponent,
    AnimalDetailsComponent,
    CommentCardComponent,
    AddCommentDialogComponent,
    RequestWalkComponent,
    RequestAdoptionComponent,
    CreateAnimalComponent
  ],
    imports: [
        AvailableAnimalsRoutingModule,
        ReactiveFormsModule,
        MatIcon,
        RegisterModule,
        NgIf,
        NgForOf,
        DatePipe,
        HomeModule,
        CoreModule,
        SharedModule,
        NgxPaginationModule,
        MatFormField,
        MatSelect,
        MatOption,
        FormsModule,
        MatLabel,
        MatPaginator,
        NgClass,
        NgStyle,
        MatDialogContent,
        MatDialogTitle,
        CdkTextareaAutosize,
        MatInput,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatHint,
        NgxMatTimepickerComponent,
        NgxMatTimepickerDirective,
        MatPrefix,
        MatCheckbox,
        MatProgressSpinner,
        TranslateModule
    ],
})
export class AvailableAnimalsModule {
}
