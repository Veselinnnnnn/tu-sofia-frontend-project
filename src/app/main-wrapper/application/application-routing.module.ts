import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationPageComponent } from './components/application-page/application-page.component';
import { ApplicationReviewComponent } from './components/application-review/application-review.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationPageComponent,
  },
  {
    path: 'review/:id',
    component: ApplicationReviewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
