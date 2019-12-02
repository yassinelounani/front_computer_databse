import { Component, OnInit } from '@angular/core';
import { Company } from '../model/company.model';
import { PageSettingsModel, EditSettingsModel } from '@syncfusion/ej2-grids';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-companys',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  // public data: Company[];
  // public pageSettings: PageSettingsModel;
  // public editSettings: EditSettingsModel;

  // constructor(private companyService: CompanyService) { }

  ngOnInit() {
    // this.companyService.getCompanies().subscribe(companies => {
    //   this.data = companies;
    // });
    // this.pageSettings = { pageSize: 5 };
    // this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  }

}
