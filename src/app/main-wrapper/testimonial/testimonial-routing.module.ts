import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TestimonialPageWrapperComponent
} from './components/testimonial-page-wrapper/testimonial-page-wrapper.component';
import { TestimonialPageComponent } from './components/testimonial-page/testimonial-page.component';

const routes: Routes = [
  {
    path: '',
    component: TestimonialPageWrapperComponent,
    children: [
      {
        path: '',
        component: TestimonialPageComponent
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestimonialRoutingModule {
}
