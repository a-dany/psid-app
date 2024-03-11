import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../services/data-provider.service';
import { ChartsProvider } from '../../services/charts-provider.service';
import  _  from 'lodash';


@Component({
  selector: 'app-dynamic-stats-page',
  templateUrl: './dynamic-stats-page.component.html',
  styleUrl: './dynamic-stats-page.component.scss'
})
export class DynamicStatsPageComponent implements OnInit {


  /***| ATTRIBUTES |***/
  
  private dataset!:any;


  /***| FORM ATTRIBUTES |****/

  public isAccessible:boolean = false
  public isFloorUnder:boolean = false
  public isRenewalNeeded:boolean = false
  public hasAc:boolean = false
  public hasPool:boolean = false
  public hasTerrace:boolean = false
  public hasBalcony:boolean = false
  public hasParking:boolean = false
  public energyCertificate:boolean = false
  public hasGarden:boolean = false
  public isNewDevelopment:boolean = false


  /***| FORM DEFINITIONS |***/

  public toggleIsAccessible = () => this.isAccessible = !this.isAccessible;
  public toggleIsFloorUnder = () => this.isFloorUnder = !this.isFloorUnder;
  public toggleIsRenewalNeeded = () => this.isRenewalNeeded = !this.isRenewalNeeded;
  public toggleHasAc = () => this.hasAc = !this.hasAc;
  public toggleHasPool = () => this.hasPool = !this.hasPool;
  public toggleHasTerrace = () => this.hasTerrace = !this.hasTerrace;
  public toggleHasBalcony = () => this.hasBalcony = !this.hasBalcony;
  public toggleHasParking = () => this.hasParking = !this.hasParking;
  public toggleEnergyCertificate = () => this.energyCertificate = !this.energyCertificate;
  public toggleHasGarden = () => this.hasGarden = !this.hasGarden;
  public toggleIsNewDevelopment = () => this.isNewDevelopment = !this.isNewDevelopment;
  
  

  /***| HOOKS |***/

  constructor(private _data:DataProviderService, private _chart:ChartsProvider) {}
  ngOnInit() {
    
    this._data.getDataWithCoords().subscribe( data => this.dataset = this._data.parseCsv(data)
    )
    .add(() => this.init())

  }

  private init() {
    this.initChart();
  }

  private initChart() {
    
    let data = this.dataset.map((item:any) => {
      return { rentPrice: item.rent_price, buyPrice: item.buy_price, district: item.subtitle.replace(/,\s*Madrid/g, '') }
    });

    let grouped = _.groupBy(data, 'district');;

    console.log(grouped)



  }

}
