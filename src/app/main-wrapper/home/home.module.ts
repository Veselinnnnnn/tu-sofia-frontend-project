import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageWrapperComponent } from './components/home-page-wrapper/home-page-wrapper.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterModule } from '../authentication/register/register.module';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { MainModule } from '../main.module';
import { CoreModule } from '../../core/core.module';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { TestimonialModule } from '../testimonial/testimonial.module';
import { PaypalDialogComponent } from './components/paypal-dialog/paypal-dialog.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatInput } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HomePageWrapperComponent,
    HomePageComponent,
    PaypalDialogComponent,
  ],
    imports: [
        HomeRoutingModule,
        ReactiveFormsModule,
        MatIcon,
        RegisterModule,
        NgIf,
        NgForOf,
        DatePipe,
        MainModule,
        CoreModule,
        MatTooltip,
        MatButton,
        MatCard,
        MatError,
        MatLabel,
        MatCardContent,
        TestimonialModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatProgressBar,
        MatFormField,
        MatInput,
        FormsModule,
        MatPrefix,
        MatIconModule,
        TranslateModule
    ],
})
export class HomeModule {
}
