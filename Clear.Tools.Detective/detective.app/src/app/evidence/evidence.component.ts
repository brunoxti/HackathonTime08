import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import axios from 'axios';
import * as _ from 'lodash';

import { NotificationService } from '../core/services/notification.service';
import { TestEvidence, TestFlow, TestEvidenceStatus } from '../flow/model/flow-data.model';
import { MatDialog } from '@angular/material';
import { FlowService } from 'src/app/services/flow/flow.service';
import { EvidenceService } from 'src/app/services/evidence/evidence.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {
  displayedColumns: string[] = ['system', 'description', 'tests', 'actions'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private dialog: MatDialog,
    private flowService: FlowService,
    private evidenceService: EvidenceService,
    private router: Router
  ) { }

  evidences: TestEvidence[] = [];
  loading = true;
  retry = false;

  ngOnInit() {
    this.titleService.setTitle('Dectective - Test Flows');
    this.logger.log('test flows loaded');
    this.dataSource.sort = this.sort;

    this.retry = true;
    this.updateEvidences();
  }

  ngOnDestroy() {
    this.retry = false;
  }

  evidencesCount(flow: TestFlow) {
    return flow.tables.reduce((a, c) => a + c.lines.reduce((aa, cc) => aa + cc.commands.length, 0), 0);
  }

  async getEvidences() {
    try {
      let evidences = <TestEvidence[]>await this.evidenceService.get();
      evidences.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      evidences.filter(ev => ev.generated).forEach(ev => ev.generated.files.forEach(d => d.path = `${environment.API_URL}/${d.path}`));
      evidences.filter(ev => ev.generated).forEach(ev => ev.flows.forEach(d => d.tables.forEach(t => t.lines.forEach(l => l.videoUrl = `${environment.API_URL}/${l.videoUrl}`))));
      evidences.forEach(ev => {
        const currentEv = this.evidences.filter(ee => ee._id == ev._id)[0];
        if (!currentEv)
          return this.evidences.push(ev);

        if (currentEv.status == ev.status)
          return;

        console.log('updated');
        currentEv.status = ev.status;
        currentEv.errorMessages = ev.errorMessages;
        currentEv.generated = ev.generated;
      });
      this.loading = false;
    } catch (error) {
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async updateEvidences() {
    if (!this.retry)
      return;

    try {
      await this.getEvidences();
    } catch (error) {
      console.log('Error', error);
    } finally {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.updateEvidences();
    }
  }

  date(dateStr) {
    const dt = new Date(dateStr);
    return `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`;
  }

  status(status: TestEvidenceStatus) {
    return TestEvidenceStatus[status];
  }

  isDone(status: TestEvidenceStatus) {
    return status == TestEvidenceStatus.Done;
  }

  isError(status: TestEvidenceStatus) {
    return status == TestEvidenceStatus.Error;
  }

  fileUrl(path: string) {
    return `${environment.API_URL}` + path;
  }
}
