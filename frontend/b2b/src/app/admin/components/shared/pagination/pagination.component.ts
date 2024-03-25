import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { fluentOption, fluentSelect, provideFluentDesignSystem } from '@fluentui/web-components';
import { PayloadService } from '../../../../service/payload.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PaginationI } from '../../../../interface/payload.interface';
import { ObservableService } from '../../../../service/observable.service';
import { NgIf } from '@angular/common';

provideFluentDesignSystem().register(fluentSelect(), fluentOption());

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule, ReactiveFormsModule, NgIf],
})
export class PaginationComponent implements OnInit {
  @Input({ required: true }) totalSize: number = 0;
  @Input({ required: true }) contentSize: number = 0;
  readonly sizes: Array<number> = [25, 50, 100];
  private subscription = new Subscription();
  pages: Array<number> = [];
  form!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _payloadService: PayloadService,
    private _observableService: ObservableService,
  ) {}

  ngOnChanges(): void {
    this.initPageNumber();
  }

  ngOnInit() {
    this.initForm();
    this.formChange();
  }

  ngOnDestroy(): void {
    this._payloadService.refreshPayload();
    this.subscription.unsubscribe();
  }

  private initForm() {
    this.form = this._formBuilder.group({
      size: ['', Validators.compose([Validators.required])],
      number: ['', Validators.compose([Validators.required])],
    });
  }

  private initPageNumber() {
    const size = this._payloadService.getPaginationParam().size;
    const totalPage = Math.ceil(this.totalSize / size);
    this.pages = totalPage > 0 ? [...Array(totalPage).keys()] : [0];
  }

  private formChange() {
    const formChange$ = this.form.valueChanges.subscribe((value: PaginationI) => {
      this._payloadService.setPaginationParam(value);
      this._observableService.refreshData();
    });
    this.subscription.add(formChange$);
  }

  get f() {
    return this.form.controls;
  }
}
