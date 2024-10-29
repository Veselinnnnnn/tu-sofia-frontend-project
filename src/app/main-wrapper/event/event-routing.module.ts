import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventPageComponent } from './components/event-page/event-page.component';
import { EventPageWrapperComponent } from './components/event-page-wrapper/event-page-wrapper.component';


const routes: Routes = [
  {
    path: '',
    component: EventPageWrapperComponent,
    children: [
      {
        path: '',
        component: EventPageComponent
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
