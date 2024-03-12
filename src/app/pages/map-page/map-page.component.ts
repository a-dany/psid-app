import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../services/data-provider.service';
import { GeoData, PricesGeoData } from '../../utils/map.visualization';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent implements OnInit {

  // public rawDistricts!:any;
  public geodata!:GeoData;
  

  constructor(private _data:DataProviderService) {}

  ngOnInit() {
    // this._data.getDistrictsRaw().subscribe( data => this.rawDistricts = JSON.parse(data)
    // ).add(() => {

      let geo:GeoData = new PricesGeoData(this._data);
      this.geodata = geo;

    // })
  }

}
