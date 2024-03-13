import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../services/data-provider.service';
import { NeutralGeoData, GeoData, PricesGeoData, PopulationGeoData } from '../../utils/map.visualization';
import { MapTypes } from '../../utils/map.types';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent implements OnInit {
[x: string]: any;


  public MapTypes = MapTypes;
  
  public neutral!: GeoData;   
  public prices!: GeoData;   
  public population!: GeoData;   

  public geodata!:GeoData;

  constructor(private _data:DataProviderService) {}
  ngOnInit() { 
    this.neutral = new NeutralGeoData(this._data);
    this.prices =  new PricesGeoData(this._data);
    this.population = new PopulationGeoData(this._data);
    this.mapNeutral();
  }
  

  public mapNeutral () { this.geodata = this.neutral;
  }
  public mapPrices () { this.geodata = this.prices;
  }
  public mapPopulation () { this.geodata = this.population;
  }


}
