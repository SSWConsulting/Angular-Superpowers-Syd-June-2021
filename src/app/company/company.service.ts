import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companies$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);

  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(
    private httpClient: HttpClient
  ) {
    this.loadCompanies();
  }

  private loadCompanies(): void {
    this.httpClient.get<Company[]>(
      `${this.API_BASE}/company`
    ).pipe(
      catchError(e => this.errorHandler<Company[]>(e))
    ).subscribe(companies => {
      this.companies$.next(companies);
    });
  }

  public getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  public deleteCompany(companyId: number): void {
    this.httpClient.delete<Company>(
      `${this.API_BASE}/company/${companyId}`
    ).pipe(
      catchError(e => this.errorHandler<Company>(e))
    ).subscribe(() => {
      this.loadCompanies();
    })
  }

  public addCompany(company: Company): void {
    this.httpClient.post<Company>(
      `${this.API_BASE}/company`,
      company,
      // this is not required - our API does not need it
      { headers: new HttpHeaders().set('content-type', 'application/json') }
    ).pipe(
      catchError(e => this.errorHandler<Company>(e))
    )
    .subscribe(() => {
      this.loadCompanies();
    });
  }

  public getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(
      `${this.API_BASE}/company/${companyId}`
    ).pipe(
      catchError(e => this.errorHandler<Company>(e))
    )
  }

  public updateCompany(company: Company): void {
    this.httpClient.put<Company>(
      `${this.API_BASE}/company/${company.id}`,
      company,
      // this is not required - our API does not need it
      { headers: new HttpHeaders().set('content-type', 'application/json') }
    ).pipe(
      catchError(e => this.errorHandler<Company>(e))
    ).subscribe(() => {
      this.loadCompanies();
    })
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.log('[SERVICE] error', error);
    return new Observable<T>();
  }
}
