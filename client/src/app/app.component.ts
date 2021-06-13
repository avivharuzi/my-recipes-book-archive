import { Component, OnInit } from '@angular/core';

import { NgxSeoService } from '@avivharuzi/ngx-seo';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from './shared/shared/custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form: FormGroup;

  constructor(
    private ngxSeoService: NgxSeoService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: ['', [CustomValidators.required]],
      password: ['', [CustomValidators.required]],
    });
  }

  ngOnInit(): void {
    this.ngxSeoService.subscribe();
  }
}
