import { AfterViewInit, Component, Input } from '@angular/core';
import { MapDimensions, MapView } from '../../interfaces/MapInterfaces';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {


  /***| ATTRIBUTES |***/
  
  @Input() private view:MapView = { lat:40.416775, lon:-3.703790, zoom:10 };
  @Input() public  dimensions:MapDimensions = { height:"800px", width:"100%" }
  private map!:any;
  

  /***| HOOKS |***/
  
  constructor() {}
  ngAfterViewInit() { this.init();
  }
  

  /***| HOOKS |***/

  private init():void {
    
    // Init Map
    this.map = L.map('map').setView(
      [ this.view.lat, this.view.lon ], this.view.zoom
    )

    // Init Tiles
    L.tileLayer( 'http://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web_grau/default/WEBMERCATOR/{z}/{y}/{x}.png',
      {
        maxZoom: 15, minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    ).addTo(this.map);

    console.log(this.map)

  }


}
