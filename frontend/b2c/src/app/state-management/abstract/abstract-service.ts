import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { View, ViewData, ViewError } from '../interface/view.interface';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractService<VIEW_MODEL> {
  view$ = new BehaviorSubject<View<VIEW_MODEL>>({});
  model!: VIEW_MODEL;

  constructor(@Inject(String) private _model?: VIEW_MODEL) {
    this.model = _model ? _model : <VIEW_MODEL>{};
  }

  protected generateData(viewModel: VIEW_MODEL): void {
    const data: ViewData<VIEW_MODEL> = {
      data: viewModel,
    };
    this.view$.next(data);
  }

  protected generateError(error: Error): void {
    const err: ViewError = {
      error: {
        message: error.message,
        name: error.name,
      },
    };
    this.view$.next(err);
  }

  protected generateLoading(): void {
    const viewLoader: View<VIEW_MODEL> = {
      loader: true,
    };
    this.view$.next(viewLoader);
  }

  abstract ngOnInit(): void;
}
