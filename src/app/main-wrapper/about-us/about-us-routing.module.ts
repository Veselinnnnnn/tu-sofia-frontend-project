import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsPageComponent } from './components/about-us-page/about-us-page.component';
import { AbousUsPageWrapperComponent } from './components/abous-us-page-wrapper/abous-us-page-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: AbousUsPageWrapperComponent,
    children: [
      {
        path: '',
        component: AboutUsPageComponent
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule {
}
