import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { UserWrapperComponent } from './user-wrapper/user-wrapper.component';
import { AdvancedInfoComponent } from './advanced-info/advanced-info.component';

const routes: Routes = [
  {
    path: '',
    component: UserWrapperComponent,
    children: [
      { path: 'basic-info', component: BasicInfoComponent },
      { path: 'advanced-info', component: AdvancedInfoComponent },
      { path: '', redirectTo: 'basic-info', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
