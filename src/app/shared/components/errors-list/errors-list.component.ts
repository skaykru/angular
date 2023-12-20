import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-errors-list',
  templateUrl: './errors-list.component.html',
  styleUrls: ['./errors-list.component.scss'],
})
export class ErrorsListComponent implements OnInit {
  @Input('error') set error(httpError: HttpErrorResponse | undefined) {
    if (!httpError || httpError.status !== 422) {
      return;
    }

    const newErrors: string[] = [];

    Object.keys(httpError.error.errors).forEach((errorKey) => {
      httpError.error.errors[errorKey].forEach((errorMessage: string) => {
        newErrors.push(`${errorKey} ${errorMessage}`);
      });
    });

    this.errors = newErrors;
  }
  errors: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}
