import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { 
      path: 'posts', 
      loadChildren: ()=> import ('../post/list-post/list-post.module').then(m => m.ListPostModule)  
    },
    {
      path: 'profile', 
      loadChildren: () => import ('./profile/profile.module').then(m => m.ProfileModule)
    }
  ], 
  canActivate:[AuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
