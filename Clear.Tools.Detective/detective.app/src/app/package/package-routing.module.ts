import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../shared/layout/layout.component';
import { AddEditPackage } from './add-edit/add-edit';
import { PackageComponent } from './package.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: PackageComponent },
      { path: 'new', component: AddEditPackage },
      { path: 'edit/:id', component: AddEditPackage },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule { }
