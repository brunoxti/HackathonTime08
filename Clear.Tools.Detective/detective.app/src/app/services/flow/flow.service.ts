import { Injectable } from '@angular/core';
import axios from 'axios';
import { TestFlow } from 'src/app/flow/model/flow-data.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor() { }

  public get() {
    return axios
              .get<TestFlow[]>(`${environment.API_URL}/flow`)
              .then((response) => response.data);
  }

  public getById(id) {
    return axios
              .get<TestFlow>(`${environment.API_URL}/flow/${id}`)
              .then((response) => response.data)
  }

  public create(flow) {
      return axios.post(`${environment.API_URL}/flow/create`, { content: flow });
  }

  public delete(flowId) {
    return axios.post(`${environment.API_URL}/flow/delete`, { id: flowId })
      .then((response) => console.log(response.data))
      .catch(err => console.log(err));
  }
}
