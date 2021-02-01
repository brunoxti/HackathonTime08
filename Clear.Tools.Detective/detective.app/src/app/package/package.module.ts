import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageRoutingModule } from './package-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PackageComponent } from './package.component';
import { AddEditPackage } from './add-edit/add-edit';
import { CollectDialog } from './collect-dialog/collect-dialog';

@NgModule({
  imports: [
    CommonModule,
    PackageRoutingModule,
    SharedModule,
  ],
  declarations: [
    PackageComponent,
    AddEditPackage,
    CollectDialog,
  ],
  entryComponents: [
    AddEditPackage,
    CollectDialog
  ]
})
export class PackageModule { }
