import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from '../core/services/authentication/authentication-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule),
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule),
  },
  {
    path: 'applications',
    loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'events',
    loadChildren: () => import('./event/event.module').then(m => m.EventModule),
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'available-animals',
    loadChildren: () => import('./available-animals/available-animals.module').then(m => m.AvailableAnimalsModule),
  },
  {
    path: 'testimonials',
    loadChildren: () => import('./testimonial/testimonial.module').then(m => m.TestimonialModule),
  },
  {
    path: '**',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
