import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormDataService } from './form/form.data.service';
import { CoachTreeComponent } from './coach-tree/coach-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    CoachTreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    FormDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
