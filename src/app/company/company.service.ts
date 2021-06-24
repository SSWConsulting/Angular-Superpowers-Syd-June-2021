import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(
      `${this.API_BASE}/company`
    )
    .pipe(
      tap(x => console.log('[SERVICE]', x)),
      catchError(e => this.errorHandler(e)),
      finalize(() => console.log('[SERVICE] complete'))
    );

    // return [
    //   { name: 'Company 1', email : 'email1', phone: 12345 },
    //   { name: 'Company 2', email : 'email2', phone: 67890 },
    //   { name: 'Company 3', email : 'email3', phone: 67890 },
    // ];
  }

  private errorHandler(error: Error): Observable<Company[]> {
    console.log('[SERVICE] error', error);
    return new Observable<Company[]>();
  }
}
