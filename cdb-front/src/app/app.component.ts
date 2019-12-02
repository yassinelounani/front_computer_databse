import { Component, OnInit } from '@angular/core';
import { ComputerService } from './service/computer.service';
import { Computer } from './model/computer.model';
import {PageSettingsModel, EditSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public data: Computer[];
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;

  constructor(private computerService: ComputerService) {}

  ngOnInit(): void {
    this.computerService.getComputer().subscribe(computers => {
      this.data = computers;
    });
    this.pageSettings = { pageSize: 5 };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  }

  title = 'cdb-front';
}