import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../services/data-provider.service';
import { ChartsProvider } from '../../services/charts-provider.service';
import  _  from 'lodash';
import { HistogramDataset } from '../../interfaces/HistogramDataset';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  

  /***| ATTRIBUTES |***/
  
  public dataset: any[] = [];
  private chart1!:HTMLCanvasElement;
  
  
  /***| HOOKS |***/
  
  constructor( private _data:DataProviderService, private _charts:ChartsProvider ) { }
  
  ngAfterViewInit() {
    this.chart1 = document.querySelector('#chart-1') as HTMLCanvasElement
  }

  ngOnInit(): void {
    this._data.getData().subscribe(   (data: any) => { this.dataset = this._data.parseCsv(data); }
    )
    .add( () => this.charts() )
  }
  
  
  /***| METHODS |***/

  public charts() {

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

      labels.push(parseInt(rooms))

    }

    const datasets:HistogramDataset[] = [
      {
        label: 'Mean Buy Price',
        data: roomBuyPrices.map(e => e.meanBuyPrice),
        backgroundColor: 'rgba(255, 58, 58, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 1
      },
      {
        label: 'Mean Rent Price',
        data: roomRentPrices.map(e => e.meanRentPrice),
        backgroundColor: 'rgba(0, 79, 220, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 1
      },
    ]

    // Generate Chart HERE
    this._charts.histogram( labels, datasets, this.chart1, 500
    );

  }

}
