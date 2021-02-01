import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowRoutingModule } from './flow-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlowComponent } from './flow.component';
import { AddEditFlow } from './add-edit/add-edit';
import { CollectDialog } from './collect-dialog/collect-dialog';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    FormsModule,
    CodemirrorModule,
    CommonModule,
    FlowRoutingModule,
    SharedModule,
  ],
  declarations: [
    FlowComponent,
    AddEditFlow,
    CollectDialog,
  ],
  entryComponents: [
    AddEditFlow,
    CollectDialog
  ]
})
export class FlowModule { }
