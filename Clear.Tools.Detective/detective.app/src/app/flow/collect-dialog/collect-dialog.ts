import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestFlow, TestFlowJob, TestVariable } from '../model/flow-data.model';

@Component({
    selector: 'app-collect-dialog',
    templateUrl: 'collect-dialog.html',
    styleUrls: ['collect-dialog.css']
})
export class CollectDialog {
    constructor(
        public dialogRef: MatDialogRef<CollectDialog>,
        @Inject(MAT_DIALOG_DATA) public data: TestFlow[]
    ) {
        this.flows = data;
        const allVariables = this.flows.filter(d=> d.variables).reduce((a,c) => a.concat(c.variables), []);
        allVariables.forEach(v =>  {
            if (!this.flow.variables) return;

            if (this.flow.variables.every(vv => vv.name != v.name))
                this.flow.variables.push(v);
        });
    }

    flows: TestFlow[] = [];
    flow: TestFlowJob = {
        date: this.getDate(new Date()),
        gmud: 'DOC-00001',
        title: 'Clear Pro - Login',
        flows: new Array(),
        variables: new Array()
    };

    private getDate(date: Date) {
        const dateString =
            ("00" + date.getDate()).slice(-2)
            + "/" + ("00" + (date.getMonth() + 1)).slice(-2)
            + "/" + date.getFullYear() + " "
            + ("00" + date.getHours()).slice(-2) + ":"
            + ("00" + date.getMinutes()).slice(-2);

        return dateString;
    }
}