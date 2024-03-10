import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MapDimensions, MapView } from '../../interfaces/MapInterfaces';
import * as L from 'leaflet';
import * as T from '@turf/turf';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit, OnChanges {


  /***| ATTRIBUTES |***/
  
  @Input() private view:MapView = { lat:40.416775, lon:-3.703790, zoom:11 };
  @Input() public  dimensions:MapDimensions = { height:"800px", width:"100%" }
  @Input() public  geojson!:any;

  private map!:any;
  

  /***| HOOKS |***/
  
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['geojson'] && !changes['geojson'].isFirstChange()) this.initGeojson();
  }
  ngAfterViewInit() { 
    this.init();
    this.initGeojson();
  }
  

  /***| FUNCTIONS |***/

  private init():void {
    
    // Init Map
    this.map = L.map('map').setView(
      [ this.view.lat, this.view.lon ], this.view.zoom
    )

    // Init Tiles
    L.tileLayer( 
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 20, minZoom: 10,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    ).addTo(this.map);

  }

  private initGeojson() {
    
    if (!this.geojson) return;

    let count=0;
    this.geojson.features.forEach(
      (e:any)=>{
        count++
        let c = (count===2)?'red':'blue'
        let style = {
          color:'transparent', fillColor:c
        }
        L.geoJSON(e, {style:style}).addTo(this.map)
      }
    )

  }


}