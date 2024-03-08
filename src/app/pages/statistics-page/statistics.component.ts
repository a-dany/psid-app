import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../services/data-provider.service';
import { ChartsProvider } from '../../services/charts-provider.service';
import { HistogramDataset } from '../../interfaces/HistogramDataset';
import  _  from 'lodash';
import { PieChartDataset } from '../../interfaces/PieChartDataset';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  

  /***| ATTRIBUTES |***/
  
  public dataset: any[] = [];
  private chart1!:HTMLCanvasElement;
  private chart2!:HTMLCanvasElement;
  private chart3!: HTMLCanvasElement;

  
  /***| HOOKS |***/
  
  constructor( private _data:DataProviderService, private _charts:ChartsProvider ) { }
  

  ngAfterViewInit() {
    this.chart1 = document.querySelector('#chart-1') as HTMLCanvasElement;
    this.chart2 = document.querySelector('#chart-2') as HTMLCanvasElement;
    this.chart3 = document.querySelector('#chart-3') as HTMLCanvasElement;
  }  

  ngOnInit(): void {
    this._data.getData().subscribe(   (data: any) => { this.dataset = this._data.parseCsv(data); }
    )
    .add( () => this.charts() )
  }
  
  
  /***| METHODS |***/

  public charts() {

    this.initChart1();
    this.initChart2();
    this.initChart3();

  }


  /***| INDIVIDUAL CHART GENERATION |***/

  private initChart1() {

    let data = this.dataset.map(item => {
      return { rentPrice: item.rent_price, buyPrice: item.buy_price, rooms: item.n_rooms }
    });

    let groupedByRooms = _.groupBy(data, 'rooms')
    let roomBuyPrices = []; let roomRentPrices = [];
    let labels = []

    for (const rooms in groupedByRooms) {
      const buyPrices  = groupedByRooms[rooms].map(item => Math.abs(parseFloat(item.buyPrice ))).reduce((a,b) => a+b) / groupedByRooms[rooms].length;
      const rentPrices = groupedByRooms[rooms].map(item => Math.abs(parseFloat(item.rentPrice))).reduce((a,b) => a+b) / groupedByRooms[rooms].length;

      roomBuyPrices .push({ rooms: rooms, meanBuyPrice : Math.round(buyPrices  * 100) / 100 });
      roomRentPrices.push({ rooms: rooms, meanRentPrice: Math.round(rentPrices * 100) / 100 });

      labels.push(parseFloat(rooms))

    }

    const ds:HistogramDataset[] = [
      {
        label: 'Mean Buy Price',
        data: roomBuyPrices.map(e => e.meanBuyPrice),
        backgroundColor: 'rgba(255, 58, 58, 0.60)',
        borderColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 1
      },
      {
        label: 'Mean Rent Price',
        data: roomRentPrices.map(e => e.meanRentPrice),
        backgroundColor: 'rgba(0, 79, 220, 0.60)',
        borderColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 1
      }
    ]

    // Generate Chart HERE
    this._charts.histogram( labels, ds, 'rooms', 'prices €',  this.chart1, 100
    );

  }

  private initChart2() {
    this.chart2
  }

  
  private initChart3() {
  // Filtrer les types de maison non vides
  const houseTypes = this.dataset
    .filter(item => item.house_type_id.trim() !== "") // Vérifie si house_type_id n'est pas vide
    .map(item => {
      // Mapping des équivalents pour chaque house_type_id
      switch (item.house_type_id) {
        case 'HouseType 1: Pisos':
          return 'Apartment';
        case 'HouseType 2: Casa o chalet':
          return 'House/Cottage';
        case 'HouseType 4: D√∫plex':
          return 'Duplex';
        case 'HouseType 5: √Åticos':
          return 'Attic';
        default:
          return item.house_type_id;
      }
    });

  // Obtenir les types de maison uniques
  const uniqueHouseTypes = [...new Set(houseTypes)];

  // Compter le nombre de chaque type de maison
  const countHouseTypes = uniqueHouseTypes.map(houseType => {
    return houseTypes.filter(type => type === houseType).length;
  });

  // Créer le jeu de données pour la charte
  const ds: PieChartDataset = {
    labels: uniqueHouseTypes,
    data: countHouseTypes,
    backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
    borderWidth: 1
  };

  // Afficher la pie chart
  this._charts.pieChart(ds.labels, ds.data, ds.backgroundColor, ds.borderColor, ds.borderWidth, this.chart3);
}

  
  
  

}
