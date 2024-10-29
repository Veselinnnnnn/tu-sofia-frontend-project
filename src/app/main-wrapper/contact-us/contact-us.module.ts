import { NgModule } from '@angular/core';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RegisterModule } from '../authentication/register/register.module';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { MainModule } from '../main.module';
import { CoreModule } from '../../core/core.module';
import { ContactUsPageComponent } from './components/contact-us-page/contact-us-page.component';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ContactUsPageWrapperComponent } from './components/contact-us-page-wrapper/contact-us-page-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ContactUsPageComponent,
    ContactUsPageWrapperComponent,
  ],
    imports: [
        ContactUsRoutingModule,
        ReactiveFormsModule,
        MatIcon,
        RegisterModule,
        NgIf,
        NgForOf,
        DatePipe,
        MainModule,
        CoreModule,
        MatTooltip,
        MatFormField,
        MatInput,
        MatSelect,
        MatOption,
        MatButton,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        TranslateModule,
    ],
})
export class ContactUsModule {
}
