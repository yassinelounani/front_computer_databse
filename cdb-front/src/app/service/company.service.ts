import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyUrl = 'http://localhost:8080/cdb-webapp/companies';

  constructor(private httpClient: HttpClient) {
  }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.companyUrl);
  }
}
