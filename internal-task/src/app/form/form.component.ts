import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormDataService } from './form.data.service';
import { FormModel } from './form.model';
import { Subscription, of } from 'rxjs';
import { tap, catchError, debounce } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit, OnDestroy {
  @ViewChild('createForm', { static: false }) createForm: NgForm;
  forms: FormModel[];
  newForm: FormModel;
  subscriptions = new Subscription();
  hasError = false;
  fullNameError = '';
  emailError = '';


  constructor(
    private router: Router,
    private formDataService: FormDataService
    ) { }

  ngOnInit(): void {
    this.newForm = new FormModel();
    this.forms = [];
    this.loadCoaches();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmitCreate(): void {
    if (this.createForm.invalid) {
      this.hasError = true;

      return;
    }

    if (this.fullNameError || this.emailError) {
      return;
    }

    this.hasError = false;

    const subscription = this.formDataService.createForm(this.newForm)
      .pipe(catchError(() => {
        return of('');
      }))
      .pipe(tap((response) => {
          if (response.response === 'OK') {
            this.fullNameError = '';
            this.router.navigate(['coachTree']);
          }
      })).subscribe();


    this.subscriptions.add(subscription);
  }

  loadCoaches(): void {
    const subscription = this.formDataService.getForms().subscribe((response) => {
      this.forms = response;
    });

    this.subscriptions.add(subscription);
  }

  onFullNameChange(): void {
    const fullName = this.newForm.fullName;

    if (fullName.length < 3 || fullName.length > 64) {
      this.fullNameError = 'Must be between 3 and 64 characters long';
    } else if (fullName.split(' ').length > 4) {
      this.fullNameError = 'Full Name must not contain more than 4 words';
    } else if (this.hasSpecialCharacters(fullName)) {
      this.fullNameError = 'Full Name must not contain special characters';
    } else {
      const subscription = this.formDataService.fullNameValidation(fullName)
        .pipe(catchError(() => {
          return of('');
        }))
        .pipe(tap((response) => {
            if (response.response === 'OK') {
              this.fullNameError = '';
            } else {
              this.fullNameError = 'Full Name is not unique. It must be unique';
            }
        })).subscribe();

      this.subscriptions.add(subscription);
    }
  }

  onEmailChange(): void {
    const email = this.newForm.email;
    const fullName = this.newForm.fullName;
    const emailName = email.split('@')[0]; //Email beginning

    if (!email || !fullName) {
      this.emailError = '';
      return;
    }

    if (emailName.toLowerCase() !== fullName.replace(' ', '.').toLowerCase()) {
      this.emailError = 'Email name should match the full name (e.g. John Smith email: john.smith@example.com)'
    } else {
      this.emailError = '';
    }

  }

  hasSpecialCharacters(fullName: string): boolean {
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(fullName);
  }

}
