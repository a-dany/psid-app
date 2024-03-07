import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DataProviderService } from '../../services/data-provider.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  
  public dataset: any[] = [];

  constructor( private _data:DataProviderService ) { }

  ngOnInit(): void {
    this._data.getData().subscribe(
      (data: any) => {
        this.dataset = this._data.parseCsv(data);
        this.generateHistogram();
      }
    ).add( () => this.charts() )
    
  }

  public charts() {

    let pricesByRoomNumber = this.dataset.map(item => {
      return { rentPrice: item.rent_price, buyPrice: item.buy_price, rooms: item.n_rooms }
    })

    

  }

  generateHistogram(): void {
    // Obtenir les valeurs uniques de la colonne n_rooms
    const uniqueRooms = [...new Set(this.dataset.map(data => data.n_rooms))];
  
    // Obtenir les valeurs minimales et maximales des prix d'achat
    const minPrice = Math.min(...this.dataset.filter(data => data.buy_price >= 0).map(data => data.buy_price));
    const maxPrice = Math.max(...this.dataset.filter(data => data.buy_price >= 0).map(data => data.buy_price));
  
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
          data: this.dataset.map(data => data.buy_price),
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
