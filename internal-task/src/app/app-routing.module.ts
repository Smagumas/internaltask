import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { CoachTreeComponent } from './coach-tree/coach-tree.component';

const routes: Routes = [
  {
    path: 'newForm',
    component: FormComponent
  },
  {
    path: 'coachTree',
    component: CoachTreeComponent
  },
  {
    path: '**',
    redirectTo: 'newForm'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
