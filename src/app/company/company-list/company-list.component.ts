import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies: Company[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getCompanies()
  }

  getCompanies(): void {
    this.companies = [
      { name: 'Company 1', email : 'email1', phone: 12345 },
      { name: 'Company 2', email : 'email2', phone: 67890 },
    ];
  }
}
