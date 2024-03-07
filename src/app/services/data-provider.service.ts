import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  
  constructor(private http:HttpClient, private parser: Papa) { }

  
  /***| GET THE DATA FROM CSV FILE |***/

  public getData(): Observable<any> {
    return this.http.get('/assets/dataset-clean.csv', { responseType: 'text' });
  }


  public parseCsv(csv:string) {
    const json = this.parser.parse(csv, { header: true, skipEmptyLines: true }).data;
    return json;
  }

  
}
