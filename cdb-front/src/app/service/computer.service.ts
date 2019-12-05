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
    private headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

  private computerUrl = 'http://localhost:8080/cdb-webapp/computers';

  constructor(private httpClient: HttpClient) {
  }

  getComputer(): Observable<Computer[]> {
    return this.httpClient.get<Computer[]>(this.computerUrl);
  }

  getComputerByPage(navigation: Navigation): Observable<Page> {
    const params = new HttpParams()
        .set('number', navigation.number)
        .set('size', navigation.size);
    return this.httpClient.get<Page>(`${this.computerUrl}/page`, {params: params, headers: this.headers});
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
    return this.httpClient.post<Computer>(`${this.computerUrl}/add`, computer);
  }

  updateComputer(computer: Computer): Observable<Computer> {
    return this.httpClient.put<Computer>(`${this.computerUrl}/update`, computer);
  }

  deleteComputerById(id: string): Observable<{}> {
    return this.httpClient.delete<Computer>(`${this.computerUrl}/delete/${id}`);
  }

  deleteCompanyById(id: string): Observable<{}> {
    return this.httpClient.delete<Computer>(`${this.computerUrl}/delete/company/${id}`);
  }
  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

}
