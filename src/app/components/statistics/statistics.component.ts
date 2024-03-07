import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  csvData: any[] = [];

  constructor(private http:HttpClient) { 
    Chart.register(...registerables); // Enregistrez les plugins de Chart.js
  }

  ngOnInit(): void {
    this.getData().subscribe((data: any) => {
      this.csvData = this.parseCSVData(data);
      this.generateHistogram();
    });
  }

  getData(): Observable<any> {
    return this.http.get('/assets/dataset-clean.csv', { responseType: 'text' });
  }
  
  parseCSVData(csvData: string): any[] {
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

  generateHistogram(): void {
    // Obtenir les valeurs uniques de la colonne n_rooms
    const uniqueRooms = [...new Set(this.csvData.map(data => data.n_rooms))];
  
    // Obtenir les valeurs minimales et maximales des prix d'achat
    const minPrice = Math.min(...this.csvData.filter(data => data.buy_price >= 0).map(data => data.buy_price));
    const maxPrice = Math.max(...this.csvData.filter(data => data.buy_price >= 0).map(data => data.buy_price));
  
    // Créer les options pour l'axe Y
    const yAxisOptions = {
      ticks: {
        min: minPrice, // Plage de prix minimale
        max: maxPrice, // Plage de prix maximale
        stepSize: 1000000 // Écart entre chaque valeur sur l'axe Y
      }
    };
  
    // Créer le graphique avec les données filtrées et les options d'axe Y
    const ctx = document.getElementById('histogramChart') as HTMLCanvasElement;
    const histogramChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: uniqueRooms.map(room => `${room}`), // Utiliser les valeurs uniques de n_rooms sur l'axe X
        datasets: [{
          label: 'Buy Price',
          data: this.csvData.map(data => data.buy_price),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Number of Rooms'
            }
          },
          y: yAxisOptions // Utiliser les options d'axe Y définies ci-dessus
        }
      }
    });
  }
}
