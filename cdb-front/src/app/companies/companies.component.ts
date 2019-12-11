import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../model/company.model';
import { EditSettingsModel, ToolbarItems, ActionEventArgs, DialogEditEventArgs } from '@syncfusion/ej2-grids';
import { CompanyService } from '../service/company.service';
import { Navigation } from '../model/navigation.model';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-companys',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  @ViewChild('grid', { static: false })
  grid: GridComponent;
  data: Company[];
  editSettings: EditSettingsModel;
  toolbar: ToolbarItems[];
  isEdit: boolean;
  orderForm: FormGroup;

  navigation: Navigation;
  length: string;
  isFilter: boolean;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getCompanies().subscribe(companies => {
      this.data = companies;
    });

    this.isEdit = false;
    this.isFilter = false;
    this.orderForm = this.createFormGroup({});
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

    this.navigation = {}
    this.navigation.number = '0';
    this.navigation.order = 'ASC';
    this.navigation.size = '10';
    this.navigation.value = '';
    this.updateData();
  }

  actionBegin(args: ActionEventArgs): void {

    switch (args.requestType) {

      case 'beginEdit':
        this.edit(args);
        break;

      case 'add':
        this.add(args);
        break;

      case 'save':
        this.save(args);
        break;

      case 'delete':
        this.delete(args);
        break;

      case 'sorting':
        this.sort(args);
        break;

      case 'filtering':
        this.filter(args);
        break;
    }
  }

  actionComplete(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      // Set initial Focus
      (args.form.elements.namedItem('name') as HTMLInputElement).focus();
    }
  }

  public focusIn(target: HTMLElement): void {
    target.parentElement.classList.add('e-input-focus');
  }

  public focusOut(target: HTMLElement): void {
    target.parentElement.classList.remove('e-input-focus');
  }

  dataBound() {
    Object.assign(this.grid.filterModule.filterOperators, { startsWith: 'contains', equal: 'contains' });
  }

  filter(args: ActionEventArgs) {
    if (args.currentFilteringColumn === 'name') {
      this.isFilter = true;
      this.navigation.value = args.currentFilterObject.value.toString();
    } else {
      this.isFilter = false;
      this.navigation.value = '';
    }

    this.updateData();
  }

  sort(args: ActionEventArgs) {
    if (args.direction === 'Ascending') {
      this.navigation.order = 'ASC'
    } else if (args.direction === 'Descending') {
      this.navigation.order = 'DSC'
    } else {
      this.navigation.order = 'ASC'
    }
    this.updateData();
  }

  delete(args: ActionEventArgs) {
    this.companyService.deleteCompanyById(args.data[0].id).subscribe(() => { this.updateData() });
  }

  save(args: ActionEventArgs) {
    if (this.orderForm.valid) {
      const company: Company = this.orderForm.getRawValue();
      if (this.isEdit) {
        this.isEdit = false;
        this.companyService.updateCompany(company).subscribe(() => { this.updateData() });
      } else {
        this.companyService.addCompany(company).subscribe(() => { this.updateData() });
      }
    } else {
      args.cancel = true;
    }
  }

  add(args: ActionEventArgs) {
    this.orderForm = this.createFormGroup(args.rowData);
  }

  edit(args: ActionEventArgs) {
    this.isEdit = true;
    this.orderForm = this.createFormGroup(args.rowData);
  }

  createFormGroup(data: Company): FormGroup {
    return new FormGroup({
      id: new FormControl(data.id),
      name: new FormControl(data.name, Validators.required)
    });
  }

  updatePage(pageEvent: PageEvent) {
    this.navigation.number = (pageEvent.pageIndex).toString();
    this.navigation.size = pageEvent.pageSize.toString();
    this.updateData();
  }

  updateData() {
    this.companyService.getCompanyBySort(this.navigation).subscribe(page => {
      this.data = page.content;
      this.length = page.totalElement;
    });
  }
}
