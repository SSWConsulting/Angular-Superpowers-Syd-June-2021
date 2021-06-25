import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
