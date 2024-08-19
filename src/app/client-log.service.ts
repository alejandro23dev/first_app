import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientLogService {
  private clientLog: any = [];

  constructor() {}

  setClientLog(data: any) {
    this.clientLog = data;
  }

  getClientLog() {
    return this.clientLog;
  }
}
