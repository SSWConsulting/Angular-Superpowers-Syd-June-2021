import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies$!: Observable<Company[]>;

  constructor(
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.getCompanies()
  }

  getCompanies(): void {
    this.companies$ = this.companyService.getCompanies();
  }

  deleteCompany(companyId: number): void {
    this.companyService.deleteCompany(companyId);
  }
}
