import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestFlow, TestFlowJob } from '../model/flow-data.model';

@Component({
    selector: 'app-collect-dialog',
    templateUrl: 'collect-dialog.html',
})
export class CollectDialog {
    constructor(
        public dialogRef: MatDialogRef<CollectDialog>,
        @Inject(MAT_DIALOG_DATA) public data: TestFlow[]
    ) {
        this.flows = data;
    }

    flows: TestFlow[] = [];
    flow: TestFlowJob = {
        date: this.getDate(new Date()),
        gmud: 'CHG0000000',
        title: 'GMUD - Evidências de Teste de Regressão',
        flows: []
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