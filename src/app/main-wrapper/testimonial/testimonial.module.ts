import { NgModule } from '@angular/core';
import { TestimonialRoutingModule } from './testimonial-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RegisterModule } from '../authentication/register/register.module';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { MainModule } from '../main.module';
import { CoreModule } from '../../core/core.module';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { TestimonialPageComponent } from './components/testimonial-page/testimonial-page.component';
import { TestimonialPageWrapperComponent } from './components/testimonial-page-wrapper/testimonial-page-wrapper.component';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldModule, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { TestimonialDialogComponent } from './components/testimonial-dialog/testimonial-dialog.component';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TestimonialDialogComponent,
    TestimonialPageComponent,
    TestimonialPageWrapperComponent
  ],
    imports: [
        TestimonialRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatCardModule,
        DatePipe,
        NgIf,
        CoreModule,
        NgForOf,
        MatToolbar,
        MatPrefix,
        TranslateModule
    ],
  exports: [
    TestimonialDialogComponent,
  ]
})
export class TestimonialModule {
}
