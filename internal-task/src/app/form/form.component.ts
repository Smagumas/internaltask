import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormDataService } from './form.data.service';
import { FormModel } from './form.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit, OnDestroy {
  @ViewChild('createForm', { static: false }) createForm: NgForm;
  coaches = [];
  newForm: FormModel;
  subscriptions = new Subscription();
  hasError = false;


  constructor(private formDataService: FormDataService) { }

  ngOnInit(): void {
    this.newForm = new FormModel();
    this.loadCoaches();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onClickCreate(): void {
    if (this.createForm.invalid) {
      return;
    }

    const subscription = this.formDataService.createForm(this.newForm).subscribe(() => {
      console.log('success');
    }, () => {
      this.hasError = true;
    });

    this.subscriptions.add(subscription);
  }

  loadCoaches(): void {
    const subscription = this.formDataService.getCoaches().subscribe((response) => {
      this.coaches = response;
    });

    this.subscriptions.add(subscription);
  }

}
