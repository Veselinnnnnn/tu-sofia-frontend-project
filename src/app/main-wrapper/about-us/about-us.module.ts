import { NgModule } from '@angular/core';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RegisterModule } from '../authentication/register/register.module';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { MainModule } from '../main.module';
import { CoreModule } from '../../core/core.module';
import { AboutUsPageComponent } from './components/about-us-page/about-us-page.component';
import { AbousUsPageWrapperComponent } from './components/abous-us-page-wrapper/abous-us-page-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AboutUsPageComponent,
    AbousUsPageWrapperComponent
  ],
    imports: [
        AboutUsRoutingModule,
        ReactiveFormsModule,
        MatIcon,
        RegisterModule,
        NgIf,
        NgForOf,
        DatePipe,
        MainModule,
        CoreModule,
        TranslateModule,
    ],
})
export class AboutUsModule {
}
