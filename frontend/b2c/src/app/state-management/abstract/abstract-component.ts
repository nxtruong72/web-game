import { Injectable, OnInit } from '@angular/core';
import { AbstractService } from './abstract-service';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractComponent<VIEW_MODEL> implements OnInit {
  constructor(protected appAbstractService: AbstractService<VIEW_MODEL>) {}

  ngOnInit(): void {
    this.appAbstractService.ngOnInit();
  }

  get model(): VIEW_MODEL {
    return this.appAbstractService.model;
  }

  get view$() {
    return this.appAbstractService.view$;
  }
}
