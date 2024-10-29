import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalShelterComponent } from './components/animal-shelter/animal-shelter.component';
import { ViewAnimalShelterComponent } from './components/view-animal-shelter/view-animal-shelter.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';

const routes: Routes = [
  {
    path: '',
    component: AnimalShelterComponent,
    children: [
      {
        path: '',
        component: ViewAnimalShelterComponent,
      },
      {
        path: 'animal/:id',
        component: AnimalDetailsComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvailableAnimalsRoutingModule {
}
