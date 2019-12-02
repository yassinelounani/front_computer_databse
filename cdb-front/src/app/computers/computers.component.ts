import { Component, OnInit } from '@angular/core';
import { Computer } from '../model/computer.model';
import { PageSettingsModel, EditSettingsModel } from '@syncfusion/ej2-grids';
import { ComputerService } from '../service/computer.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss']
})
export class ComputersComponent implements OnInit {


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
