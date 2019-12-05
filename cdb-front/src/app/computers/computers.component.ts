import { Component, OnInit } from '@angular/core';
import { Computer } from '../model/computer.model';
import { PageSettingsModel, EditSettingsModel, ToolbarItems, SaveEventArgs, DialogEditEventArgs } from '@syncfusion/ej2-grids';
import { ComputerService } from '../service/computer.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Company } from '../model/company.model';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss']
})
export class ComputersComponent implements OnInit {


  public data: Computer[];
  public companies: Company[];
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public orderForm: FormGroup;
  public isEdit: boolean;

  constructor(private computerService: ComputerService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.computerService.getComputer().subscribe(computers => {
      this.data = computers;
    });
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    });
    this.pageSettings = { pageSize: 10, pageSizes: ['10', '25', '50', 'All'] };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.orderForm = this.createFormGroup({});
    this.isEdit = false;
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

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit') {
      this.isEdit = true;
    }
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      console.log(args.rowData);
      this.orderForm = this.createFormGroup(args.rowData);
    }
    if (args.requestType === 'save') {
      if (this.orderForm.valid) {
        args.data = this.orderForm.value;
        if (this.isEdit) {
          this.isEdit = false;
          this.computerService.updateComputer(this.orderForm.getRawValue()).subscribe();
        }
        else {
          this.computerService.addComputer(this.orderForm.getRawValue()).subscribe();
        }
      } else {
        args.cancel = true;
      }
    }
    if (args.requestType === 'delete') {
      this.computerService.deleteComputerById(args.data[0].id).subscribe();
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

}
