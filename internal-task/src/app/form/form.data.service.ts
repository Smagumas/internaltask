import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormModel } from './form.model';
import { CoachModel } from './coach.model';

@Injectable()
export class FormDataService {

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private httpClient: HttpClient) {
    }

    getForms(): Observable<FormModel[]> {
        return this.httpClient.get<FormModel[]>(`${environment.api}/forms/`, this.httpOptions);
    }

    createForm(form: FormModel): Observable<any> {
      return this.httpClient.post<FormModel>(`${environment.api}/forms/create`, form, this.httpOptions);
    }

    getCoaches(): Observable<CoachModel[]> {
      return this.httpClient.get<CoachModel[]>(`${environment.api}/coaches/`, this.httpOptions);
    }
}
