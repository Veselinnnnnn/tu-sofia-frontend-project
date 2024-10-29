import { NgModule } from '@angular/core';
import { EventRoutingModule } from './event-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RegisterModule } from '../authentication/register/register.module';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { MainModule } from '../main.module';
import { CoreModule } from '../../core/core.module';
import { EventPageComponent } from './components/event-page/event-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EventPageWrapperComponent } from './components/event-page-wrapper/event-page-wrapper.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EventPageComponent,
    EventPageWrapperComponent
  ],
    imports: [
        EventRoutingModule,
        ReactiveFormsModule,
        MatIcon,
        RegisterModule,
        NgIf,
        NgForOf,
        DatePipe,
        MainModule,
        CoreModule,
        FormsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatToolbarModule,
        MatTabGroup,
        MatTab,
        NgClass,
        TranslateModule
    ],
})
export class EventModule {
}
