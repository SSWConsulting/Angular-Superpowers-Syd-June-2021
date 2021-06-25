import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  // companyForm: FormGroup = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   email: new FormControl(),
  //   phone: new FormControl()
  // })

  companyForm: FormGroup = this.formBuilder.group(
    {
      name: ['', Validators.required],
      email: [],
      phone: [],
    }
  )

  currentName: string = "";
  companyId?: number;
  isNewCompany: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private companyService: CompanyService
    ) {
  }

  get form(){
    return this.companyForm.controls;
  }

  ngOnInit(): void {
    this.companyForm.controls.name?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged()
    )
    .subscribe(value => {
      this.currentName = value;
    })

    this.companyId = this.activateRoute.snapshot.params.id;
    this.isNewCompany = !this.companyId;

    if(!this.isNewCompany){
      this.companyService.getCompany(this.companyId!)
      .subscribe(company => {
        this.companyForm.patchValue(company);
      });

    }

    // Todo: grab the current values for the current company
  }

  saveChanges(){


    if(this.isNewCompany){

    const newCompany = this.companyForm.value as Company;

    this.companyService.addCompany(newCompany)
      .subscribe(() => {
        this.router.navigateByUrl('/company/list');
        // this.router.navigate(['company', 'list']); // Equivalent to the above
      });
    }else{

      const company = {...this.companyForm.value, id: this.companyId}

      this.companyService.updateCompany(company)
      .subscribe(() => {
        this.router.navigateByUrl('/company/list');
      });
    }
  }

}
