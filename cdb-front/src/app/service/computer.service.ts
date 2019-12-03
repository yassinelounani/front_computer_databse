import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Computer } from '../model/computer.model';
import { Page } from '../model/page.model';
import { Navigation } from '../model/navigation.model';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private computerUrl = 'http://localhost:8080/cdb-webapp/computers';

  constructor(private httpClient: HttpClient) {
  }

  getComputer(): Observable<Computer[]> {
    return this.httpClient.get<Computer[]>(this.computerUrl);
  }

  getComputerByPage(navigation: Navigation): Observable<Page> {
    const params = new HttpParams().set('number', navigation.number)
      .set('size', navigation.size);
    return this.httpClient.get<Page>(`${this.computerUrl}/page`, { params: params });
  }

  getComputerById(id: string): Observable<Page> {
    return this.httpClient.get<Page>(`${this.computerUrl}/${id}`);
  }

  getComputerBySort(navigation: Navigation): Observable<Page> {
    const params = new HttpParams().set('number', navigation.number)
      .set('size', navigation.size)
      .set('property', navigation.property)
      .set('order', navigation.order);
    return this.httpClient.get<Page>(`${this.computerUrl}/sort`, { params: params });
  }

  getComputerByName(navigation: Navigation, name: string): Observable<Page> {
    const params = new HttpParams().set('number', navigation.number)
      .set('size', navigation.size);
    return this.httpClient.get<Page>(`${this.computerUrl}/find/${name}`, { params: params });
  }

  addComputer(computer: Computer): Observable<Computer> {
    return this.httpClient.post<Computer>(this.computerUrl, computer);
  }

  updateComputer(computer: Computer): Observable<Computer> {
    return this.httpClient.put<Computer>(this.computerUrl, computer);
  }

  deleteComputer(id: string): Observable<{}> {
    return this.httpClient.delete(`${this.computerUrl}/delete/${id}`);
  }
}
