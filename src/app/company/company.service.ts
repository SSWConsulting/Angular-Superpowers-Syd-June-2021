import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  public getCompanies(): Company[] {
    return [
      { name: 'Company 1', email : 'email1', phone: 12345 },
      { name: 'Company 2', email : 'email2', phone: 67890 },
      { name: 'Company 3', email : 'email3', phone: 67890 },
    ];
  }
}
