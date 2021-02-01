import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../shared/layout/layout.component';
import { AddEditFlow } from './add-edit/add-edit';
import { FlowComponent } from './flow.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: FlowComponent },
      { path: 'new', component: AddEditFlow },
      { path: 'edit/:id', component: AddEditFlow },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowRoutingModule { }
