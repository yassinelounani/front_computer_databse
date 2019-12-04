import { Component, OnInit } from '@angular/core';
import {ComputerService} from '../service/computer.service';
import {Navigation} from '../model/navigation.model';
import {Page} from '../model/page.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  page:  Page = {};
  navigation: Navigation;
  constructor(private computerService: ComputerService) { }

  ngOnInit() {
    const navigation: Navigation = {};
    navigation.number = '2';
    navigation.size = '10';

    this.computerService.getComputerByPage(navigation).subscribe(
      (response) => {
        console.log(response);
        this.page = response;
      }, (error) => {
        console.log('Erreur de chargement des objects rechercheé' + error);
      }
    );
  }

}
