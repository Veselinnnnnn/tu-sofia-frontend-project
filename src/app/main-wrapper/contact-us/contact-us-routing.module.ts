import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsPageComponent } from './components/contact-us-page/contact-us-page.component';
import { ContactUsPageWrapperComponent } from './components/contact-us-page-wrapper/contact-us-page-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: ContactUsPageWrapperComponent,
    children: [
      {
        path: '',
        component: ContactUsPageComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule {
}
