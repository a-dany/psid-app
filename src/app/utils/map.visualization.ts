import * as L from 'leaflet';
import { DataProviderService } from '../services/data-provider.service';


/***| MAIN ABSTRACT CLASS |***/

export abstract class GeoData {
    
    protected map!:L.Map;

    protected styleOuterBorders:L.PathOptions = { weight:2, color:'#00000045', fillOpacity:0 }
    protected styleRegion:L.PathOptions = { color:'#00000060', weight:1, dashArray:"1 2" }

    public abstract display():void;

    public defineMap(m:L.Map) { this.map = m }
    public clear() { console.log('Clear method not ready yet.');
    }

}

/***| PRICES |***/

export class PricesGeoData extends GeoData {

    constructor(private _provider:DataProviderService) { super();
    }
    public display() { this.data(); this.borders();
    }

    private data() {
        this._provider.getDistrictsRaw().subscribe( d => {
            
            if (!d) return;

            d.features.forEach((district:any) => {
                let polygon = district.coordinates[0];
                let opacity = .5;
                this.styleRegion.fillColor = '#DD0000';
                this.styleRegion.opacity = opacity;
                L.geoJSON(district, { style: this.styleRegion }).addTo(this.map)
            })

        })
    }
    private borders() {
        this._provider.getBordersRaw().subscribe( d => {
            L.geoJSON(d, {style: this.styleOuterBorders}).addTo(this.map)
        })
    }

}

// private initGeojson() {
    
  //   if (!this.geojson) return;

  //   this._data.getDistrictColorMap().subscribe(d => {

  //     this.geojson.features.forEach(
  //       (e:any)=>{

  //         const polygon = T.polygon(e.coordinates)
  //         let current = d.find((k:any) => T.booleanPointInPolygon([k.longitude, k.latitude] , polygon))

  //         let color = "#DD0000"
  //         if (!current) color = 'gold'
  //         let opacity = (current) ? parseFloat(current.mean_price) % 0.6 + 0.15 : 0.5;
  //         let style:L.PathOptions = {
  //           color:'#00000060', fillColor:color, weight:1, fillOpacity:opacity,
  //           dashArray:"1 2"
  //         }
  //         let layer = L.geoJSON(e, { style:style })

  //         layer.addTo(this.map)
  
  //       }
  //     )

  //   })

  //   this._data.getBordersRaw().subscribe(e => {
  //     L.geoJSON(e, {style:{
  //       weight:2, color:'#00000090', fillOpacity:0
  //     }}).addTo(this.map)
  //   })

  // }


  export class PopulationGeoData extends GeoData {
    public display() {
        console.log('Population')
    }

}
