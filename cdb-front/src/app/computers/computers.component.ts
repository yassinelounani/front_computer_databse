import { Component, OnInit, ViewChild } from '@angular/core';
import { Computer } from '../model/computer.model';
import { PageSettingsModel, EditSettingsModel, ToolbarItems, DialogEditEventArgs, ActionEventArgs, FilterSettingsModel, IFilter, Filter, updateData } from '@syncfusion/ej2-grids';
import { ComputerService } from '../service/computer.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Company } from '../model/company.model';
import { CompanyService } from '../service/company.service';
import { Navigation } from '../model/navigation.model';
import { PageEvent } from '@angular/material/paginator';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss']
})
export class ComputersComponent implements OnInit {

  @ViewChild('grid', { static: false })
  public grid: GridComponent;
  public data: string[];
  public companies: Company[];
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public orderForm: FormGroup;

  public isEdit: boolean;
  public isFilter: boolean;

  public navigation: Navigation;
  public length: string;
  dropInstance: any;

  constructor(private computerService: ComputerService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    });
    this.pageSettings = { pageSize: 10, pageSizes: ['10', '25', '50', 'All'] };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.orderForm = this.createFormGroup({});
    this.isEdit = false;
    this.isFilter = false;
    this.length = '100';

    this.navigation = {}
    this.navigation.number = '0';
    this.navigation.order = 'ASC';
    this.navigation.property = 'name';
    this.navigation.size = '10';
    this.navigation.filter = '';
    this.navigation.value = '';
    this.updateData();
  }

  createFormGroup(data: Computer): FormGroup {
    return new FormGroup({
      id: new FormControl(data.id),
      name: new FormControl(data.name, Validators.required),
      introduced: new FormControl(data.introduced),
      discontinued: new FormControl(data.discontinued),
      idCompany: new FormControl(data.idCompany),
      nameCompany: new FormControl(data.nameCompany)
    });
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

      case 'refresh':
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

  edit(args: ActionEventArgs): void {
    this.isEdit = true;
    this.orderForm = this.createFormGroup(args.rowData);
  }

  add(args: ActionEventArgs): void {
    this.orderForm = this.createFormGroup(args.rowData);
  }

  save(args: ActionEventArgs): void {
    if (this.orderForm.valid) {
      const computer: Computer = this.orderForm.getRawValue();
      if (this.isEdit) {
        this.isEdit = false;
        this.computerService.updateComputer(computer).subscribe(() => { this.updateData() });
      } else {
        this.computerService.addComputer(computer).subscribe(() => { this.updateData() });
      }
    } else {
      args.cancel = true;
    }
  }

  delete(args: ActionEventArgs): void {
    this.computerService.deleteComputerById(args.data[0].id).subscribe(() => { this.updateData() });
  }

  sort(args: ActionEventArgs): void {
    if (args.direction === 'Ascending') {
      this.navigation.order = 'ASC'
    }
    if (args.direction === 'Descending') {
      this.navigation.order = 'DSC'
    }
    if (args.columnName) {
      if (args.columnName === 'nameCompany') {
        this.navigation.property = 'company.name'
      } else {
        this.navigation.property = args.columnName;
      }
    } else {
      this.navigation.order = 'ASC'
      this.navigation.property = 'name'
    }
    this.updateData();
  }

  filter(args: ActionEventArgs): void {

    if (args.currentFilteringColumn) {
      this.isFilter = true;
      this.navigation.filter = args.currentFilteringColumn;

      switch (this.navigation.filter) {

        case 'introduced':
        case 'discontinued':
          this.navigation.value = args.currentFilterObject.value.toString();
          break;

        case 'name':
          this.navigation.filter = 'computer';
          this.navigation.value = args.currentFilterObject.value.toString();
          break;

        case 'nameCompany':
          this.navigation.filter = 'company';
          this.navigation.value = args.currentFilterObject.value.toString();
          break;
      }
    } else {
      this.isFilter = false;
      this.navigation.filter = '';
      this.navigation.value = '';
    }
    
    this.updateData();
  }


  dataBound() {
    Object.assign(this.grid.filterModule.filterOperators, { startsWith: 'contains', equal: 'contains' });
  }

  updatePage(pageEvent: PageEvent) {
    this.navigation.number = (pageEvent.pageIndex).toString();
    this.navigation.size = pageEvent.pageSize.toString();
    this.updateData();
  }

  updateData() {
    this.computerService.getComputerBySort(this.navigation).subscribe(page => {
      this.data = page.content;
      this.length = page.totalElement;
    });
  }

}
