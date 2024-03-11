import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MapDimensions, MapView } from '../../interfaces/MapInterfaces';
import * as L from 'leaflet';
import * as T from '@turf/turf';
import { DataProviderService } from '../../services/data-provider.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {


  /***| ATTRIBUTES |***/
  
  @Input() private view:MapView = { lat:40.50710222091962, lon:-3.5340053809203122, zoom:11};
  @Input() public  dimensions:MapDimensions = { height:"800px", width:"100%" }
  @Input() public  geojson!:any;

  private map!:any;
  private dataset!:any;
  

  /***| HOOKS |***/
  
  constructor(private _data:DataProviderService) {}
  ngOnInit() {
    
  }
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

    // this.dataset = this._data.parseCsv(ds)
    this.geojson.features.forEach(
      (e:any)=>{

        let color = "#006600"
        console.log(parseFloat(e.coordinates[0].length) % 0.2)
        let style:L.PathOptions = {
          color:'#00000060', fillColor:color, weight:1, fillOpacity:.15,//parseFloat(e.coordinates[0].length) % 0.7, 
          dashArray:"1 4"
        }
        L.geoJSON(e, {
          style:style
        }).addTo(this.map)

      }
    )

    this._data.getBordersRaw().subscribe(e => {
      L.geoJSON(e, {style:{
        weight:4, color:'#00000040', fillOpacity:0
      }}).addTo(this.map)
    })

  }


}