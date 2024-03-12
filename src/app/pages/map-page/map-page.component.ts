import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../services/data-provider.service';
import { NeutralGeoData, GeoData, PricesGeoData, PopulationGeoData } from '../../utils/map.visualization';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent implements OnInit {


  public geodata!:GeoData;  

  constructor(private _data:DataProviderService) {}
  ngOnInit() { this.mapNeutral();
  }
  

  public mapNeutral () { this.geodata = new NeutralGeoData(this._data);
  }
  public mapPrices () { this.geodata = new PricesGeoData(this._data);
  }
  public mapPopulation () { this.geodata = new PopulationGeoData(this._data);
  }


}
