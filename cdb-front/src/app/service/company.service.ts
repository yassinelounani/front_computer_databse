import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../model/company.model';
import {Navigation} from '../model/navigation.model';
import {Page} from '../model/page.model';
import {Computer} from '../model/computer.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyUrl = 'http://localhost:8080/cdb-webapp/companies';

  constructor(private httpClient: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.companyUrl);
  }

  getCompanyByPage(navigation: Navigation): Observable<Page> {
    const params = new HttpParams()
      .set('number', navigation.number)
      .set('size', navigation.size);
    return this.httpClient.get<Page>(`${this.companyUrl}/page`, { params: params });
  }

  findCompany(navigation: Navigation): Observable<Page> {
    const params = new HttpParams()
      .set('number', navigation.number)
      .set('size', navigation.size)
      .set('value', navigation.value);
    return this.httpClient.get<Page>(`${this.companyUrl}/find`, { params: params });
  }

  getCompaniesBySort(navigation: Navigation): Observable<Page> {
    const params = new HttpParams().set('number', navigation.number)
      .set('size', navigation.size)
      .set('order', navigation.order)
      .set('value', navigation.value);
    return this.httpClient.get<Page>(`${this.companyUrl}/sort`, { params: params });
  }

  addCompany(company: Company): Observable<Computer> {
    return this.httpClient.post<Computer>(`${this.companyUrl}/add`, company);
  }

  updateCompany(company: Company): Observable<Computer> {
    return this.httpClient.put<Computer>(`${this.companyUrl}/update`, company);
  }

  deleteCompanyById(id: string): Observable<{}> {
    return this.httpClient.delete<Computer>(`${this.companyUrl}/delete/${id}`);
  }
}
