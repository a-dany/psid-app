import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  
  constructor(private http:HttpClient) { }

  
  /***| GET THE DATA FROM CSV FILE |***/

  public getData(): Observable<any> {
    return this.http.get('/assets/dataset-clean.csv', { responseType: 'text' });
  }


  // TODO : Make Generic
  public parseCSV(csvData: string): any[] {
    const rows = csvData.split('\n');
    const result = [];
    for (let i = 1; i < rows.length; i++) {
      const cols = rows[i].split(',');
      result.push({
        line: cols[0],
        id: cols[1],
        title: cols[2],
        subtitle: cols[3],
        sq_mt_built: cols[4],
        sq_mt_useful: cols[5],
        n_rooms: cols[6],
        n_bathrooms: cols[7],
        n_floors: cols[8],
        raw_address: cols[9],
        is_exact_address_hidden: cols[10],
        street_name: cols[11],
        street_number: cols[12],
        floor: cols[13],
        is_floor_under: cols[14],
        neighborhood_id: cols[15],
        operation: cols[16],
        rent_price: cols[17],
        buy_price: cols[18],
        buy_price_by_area: cols[19],
        is_buy_price_known: cols[20],
        house_type_id: cols[21],
        is_renewal_needed: cols[22],
        is_new_development: cols[23],
        built_year: cols[24],
        has_central_heating: cols[25],
        has_individual_heating: cols[26],
        has_ac: cols[27],
        has_fitted_wardrobes: cols[28],
        has_lift: cols[29],
        is_exterior: cols[30],
        has_garden: cols[31],
        has_pool: cols[32],
        has_terrace: cols[33],
        has_balcony: cols[34],
        has_storage_room: cols[35],
        is_accessible: cols[36],
        has_green_zones: cols[37],
        energy_certificate: cols[38],
        has_parking: cols[39],
        is_parking_included_in_price: cols[40],
        parking_price: cols[41],
        is_orientation_north: cols[42],
        is_orientation_west: cols[43],
        is_orientation_south: cols[44],
        is_orientation_east: cols[45]
      });
    }
    return result;
  }

  
}
