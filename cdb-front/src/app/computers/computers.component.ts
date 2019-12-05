import { Component, OnInit } from '@angular/core';
import { Computer } from '../model/computer.model';
import { PageSettingsModel, EditSettingsModel, ToolbarItems, SaveEventArgs, DialogEditEventArgs, SortEventArgs ,ActionEventArgs } from '@syncfusion/ej2-grids';
import { ComputerService } from '../service/computer.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Company } from '../model/company.model';
import { CompanyService } from '../service/company.service';
import { Navigation } from '../model/navigation.model';
import { PageEvent } from '@angular/material/paginator';
import { $ } from 'protractor';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss']
})
export class ComputersComponent implements OnInit {


  public data: string[];
  public companies: Company[];
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public orderForm: FormGroup;
  public isEdit: boolean;
  
  public navigation: Navigation;
  public length: string ='100';

  constructor(private computerService: ComputerService, private companyService: CompanyService) { }

  ngOnInit(): void {
    // this.companyService.getCompanies().subscribe(companies => {
    //   this.companies = companies;
    // });
    this.pageSettings = { pageSize: 10, pageSizes: ['10', '25', '50', 'All'] };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.orderForm = this.createFormGroup({});
    this.isEdit = false;

    this.navigation= {}
    this.navigation.number= '0';
    this.navigation.order= 'ASC';
    this.navigation.property= 'id';
    this.navigation.size= '10'
    console.log(this.navigation)
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

    console.log(args)

    switch (args.requestType) {

      case 'beginEdit':
          this.isEdit = true;
      case 'add':
        this.orderForm = this.createFormGroup(args.rowData);
        break;

      case 'save':
        if (this.orderForm.valid) {
          const computer:Computer = this.orderForm.getRawValue();
          if (this.isEdit) {
            this.isEdit = false;
            this.computerService.updateComputer(computer).subscribe(()=> {this.updateData();});
          } else {
            this.computerService.addComputer(computer).subscribe(()=> {this.updateData();});
          }
          
        } else {
          args.cancel = true;
        }
        
        break;

      case 'delete':
        this.computerService.deleteComputerById(args.data[0].id).subscribe(()=> {this.updateData();});
        break;

      case 'sorting':
        if(args.direction === 'Ascending'){
          this.navigation.order = 'ASC'
        } 
        if(args.direction === 'Descending') {
          this.navigation.order = 'DSC'
        }
        if(args.columnName) {
          this.navigation.property = args.columnName;
        } else {
          this.navigation.order = 'ASC'
          this.navigation.property = 'name'
        }
        this.updateData();
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

  updatePage(pageEvent: PageEvent){
    this.navigation.number=(pageEvent.pageIndex).toString();
    this.navigation.size=pageEvent.pageSize.toString();
    this.updateData()
  }

  updateData(){
    console.log(this.navigation);
    this.computerService.getComputerBySort(this.navigation).subscribe(page => {
      this.data = page.content;
      this.length = page.totalElement;
    });
  }

}
