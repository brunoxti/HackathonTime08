import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvidenceRoutingModule } from './evidence-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EvidenceComponent } from './evidence.component';

@NgModule({
  imports: [
    CommonModule,
    EvidenceRoutingModule,
    SharedModule,
  ],
  declarations: [
    EvidenceComponent,
  ],
  entryComponents: [ ]
})
export class EvidenceModule { }
