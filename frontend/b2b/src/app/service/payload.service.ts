import { Injectable } from '@angular/core';
import { PaginationI } from '../interface/payload.interface';

@Injectable({
  providedIn: 'root',
})
export class PayloadService {
  private size = 25;
  private number = 0;

  constructor() {}

  refreshPayload() {
    this.size = 25;
    this.number = 0;
  }

  setPaginationParam(paginationParam: PaginationI) {
    this.size = paginationParam.size as number;
    this.number = paginationParam.number as number;
  }

  getPaginationParam(): PaginationI {
    return { size: this.size, number: this.number };
  }
}
