import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  private companyUrl = 'http://localhost:8080/cdb-webapp/companies';

  constructor(private httpClient: HttpClient) {
  }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.companyUrl, { headers: this.headers});
  }
}
