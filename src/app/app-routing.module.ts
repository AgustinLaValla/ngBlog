import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerAppComponent } from '../app/components/container-app/container-app.component'
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  { path: '', component:ContainerAppComponent , children:[
    { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) }, 
    { path: 'postDetail/:id', loadChildren: () => import('./components/pages/post-details/post-details.module').then(m => m.PostDetailsModule) },
    { path: 'about', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule) },
    { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    // { path: '**', redirectTo: 'home', pathMatch: 'full'}
  ]},
 
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule), canActivate:[AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
