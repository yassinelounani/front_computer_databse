import { Component, OnInit } from '@angular/core';
import {ComputerService} from '../service/computer.service';
import {Navigation} from '../model/navigation.model';
import {Page} from '../model/page.model';
import {Computer} from '../model/computer.model';
import {Company} from '../model/company.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  page:  Page = {};
  navigation: Navigation;
  computer: Computer;
  compnaies: Company[];
  constructor(private computerService: ComputerService) { }

  ngOnInit() {
    this.computer = {};
    this.computer.name = 'Pc Excilys';
    this.computer.introduced = '2019-02-10';
    this.computerService.addComputer(this.computer).subscribe(
      (response) => {
        console.log(response);
      }, (error) => {
        console.log('Erreur de chargement des objects rechercheé' + error);
      }
    );
  }

}
