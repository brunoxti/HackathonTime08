import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import axios from 'axios';
import * as _ from 'lodash';

import { NotificationService } from '../core/services/notification.service';
import { TestFlow, TestFlowJob } from './model/flow-data.model';
import { MatDialog } from '@angular/material';
import { FlowService } from 'src/app/services/flow/flow.service';
import { EvidenceService } from 'src/app/services/evidence/evidence.service';
import { Router } from '@angular/router';
import { CollectDialog } from './collect-dialog/collect-dialog';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements OnInit {
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

  flows: TestFlow[] = [];
  collect_list = [];

  blocked = [];
  loading = true;

  ngOnInit() {
    this.titleService.setTitle('Dectective - Test Flows');
    this.logger.log('test flows loaded');
    this.dataSource.sort = this.sort;

    this.flowService.get().then(flows => {
      flows.sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()));
      this.flows = <TestFlow[]>flows;
      this.blocked = this.flows.map(x => false);
      this.collect_list = this.flows.map(x => false);
      this.loading = false;
    }).catch(err => console.log(err));
  }

  evidences(flow: TestFlow) {
    return flow.tables.reduce((a, c) => a + c.lines.reduce((aa, cc) => aa + cc.commands.length, 0), 0);
  }

  openCollectDialog() {
    const flows = this.collect_list.map((v, i) => (v ? this.flows[i] : null)).filter(x => x);
    const dialogRef = this.dialog.open(CollectDialog, { width: '600px', data: flows });

    dialogRef.afterClosed().subscribe((testFlow: TestFlowJob) => {
      if (!testFlow) return;

      const flowsToCollect = this.collect_list
        .map((v, i) => (v ? this.flows[i] : null))
        .filter((flow) => flow);

      flowsToCollect.forEach(f => {
        testFlow.variables.forEach(v => {
          const currentVars = f.variables.filter(d=> d.name == v.name);
          currentVars.forEach(vv => vv.value = v.value);
        });
      });

      testFlow.flows = flowsToCollect;
      testFlow.variables = null;
      this.collect(testFlow);
    });
  }

  duplicate(index) {
    const flow = <TestFlow>JSON.parse(JSON.stringify(this.flows[index]));
    flow.name = flow.name + " COPY";
    flow._id = '';
    this.router.navigate(['/flow/new'], { state: { flow: flow } });
  }

  collect(testFlow: TestFlowJob) {
    this.loading = true;

    this.evidenceService.create(testFlow).then(() => {
      this.router.navigate(['/evidence']);
    })
      .catch(err => console.log(err));
  }

  delete(index) {
    const flow = this.flows[index];
    if (!confirm("Tem certeza que deseja excluir " + flow.name))
      return;

    this.flowService.delete(flow._id)
      .catch(err => console.log(err));
    this.flows.splice(index, 1);
  }
}
