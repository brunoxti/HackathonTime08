import { Injectable } from '@angular/core';
import axios from 'axios';
import { TestEvidence, TestFlow, TestFlowJob } from 'src/app/flow/model/flow-data.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvidenceService {

  constructor() { }

  public get() {
    return axios.get<TestEvidence[]>(`${environment.API_URL}/evidence`)
      .then((response) => {
        const evidences = response.data;
        return <TestEvidence[]>evidences;
      })
      .catch(err => console.log(err));
  }

  create(testFlow: TestFlowJob) {
    console.log({ content: JSON.stringify(testFlow) });
    return axios.post(`${environment.API_URL}/evidence`, { content: JSON.stringify(testFlow) },)
      .then((response) => {
        
        // var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        // let link = document.createElement('a')
        // link.href = window.URL.createObjectURL(blob)
        // link.download = `${testFlow.gmud} ${testFlow.flow.name}`.replace(/[\\/:]/g, '');
        // link.click();
        // this.blocked[index] = false;
        // this.loading = this.blocked.some(x => x);
      })
      .catch(err => console.log(err));
  }
}
