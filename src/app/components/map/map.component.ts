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
    // 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
    // 'http://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web_grau/default/WEBMERCATOR/{z}/{y}/{x}.png',
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
    // L.geoJSON(this.geojson, {
    //   style: {
    //     color: '#FF000000', weight:1, fillColor:'red', fillOpacity:.1
    //   }
    // }).addTo(this.map)


    // const data = this.geojson.features.map((e:any) => e.coordinates[0])
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
    // data.forEach((coords:any) => {
    //   coords = coords.map((e:any)=>{return {lat:e[1],lon:e[0]}})
    //   console.log(coords)
    //   L.geoJSON(coords).addTo(this.map)
    //   // L.polyline( coords).addTo(this.map)
    //   // coords.forEach((e:any) => L.circleMarker(e).addTo(this.map))
    // })

    // let areas = this.geojson.filter((e:any) => e.tags.type === 'boundary').map((e:any) => e.members).flatMap((e:any) => e).filter((e:any) => e.type === 'way')
    // let areas = this.geojson.filter((e:any) => e.tags.type === 'boundary').map((e:any) => e.members)//.flatMap((e:any) => e).filter((e:any) => e.type === 'way')

    // areas.forEach((a:any) => {
    //   let coords = areas[5].filter((e:any) => e.type === 'way').map((e:any) => e.geometry).flatMap((e:any) => e)
    //   const poly = L.polygon(coords, {
    //   })
    //   coords.forEach((e:any) => {
    //     // L.circleMarker(e).addTo(this.map)
    //   })
    //   const geojsonLayer = L.geoJSON(coords, {
    //     style: function (feature) {
    //         return { fillColor: 'red', fillOpacity: 0.5, color: 'red' };
    //     }
    // }).addTo(this.map);
      // poly.setStyle({ fillColor: 'blue', fill:true })
      // poly.addTo(this.map)
    // })


  }


}