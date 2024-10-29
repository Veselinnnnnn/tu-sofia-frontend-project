import { NgModule } from '@angular/core';
import { GalleryRoutingModule } from './gallery-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RegisterModule } from '../authentication/register/register.module';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { MainModule } from '../main.module';
import { CoreModule } from '../../core/core.module';
import { GalleryPageComponent } from './components/gallery-page/gallery-page.component';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    GalleryPageComponent
  ],
    imports: [
        GalleryRoutingModule,
        ReactiveFormsModule,
        MatIcon,
        RegisterModule,
        NgIf,
        NgForOf,
        DatePipe,
        MainModule,
        CoreModule,
        MatPaginator,
        TranslateModule,
    ],
})
export class GalleryModule {
}
