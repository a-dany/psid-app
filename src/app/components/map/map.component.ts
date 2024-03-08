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
  
  @Input() private view:MapView = { lat:40.416775, lon:-3.703790, zoom:11 };
  @Input() public  dimensions:MapDimensions = { height:"800px", width:"100%" }
  private map!:any;
  

  /***| HOOKS |***/
  
  constructor() {}
  ngAfterViewInit() { this.init();
  }
  

  /***| FUNCTIONS |***/

  private init():void {
    
    // Init Map
    this.map = L.map('map').setView(
      [ this.view.lat, this.view.lon ], this.view.zoom
    )

    // Init Tiles
    // 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
    // 'http://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web_grau/default/WEBMERCATOR/{z}/{y}/{x}.png',
    L.tileLayer( 
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 20, minZoom: 10,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    ).addTo(this.map);

    console.log(this.map)

  }


}
