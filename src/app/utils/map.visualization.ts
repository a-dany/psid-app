import { DataProviderService } from '../services/data-provider.service';
import * as L from 'leaflet';
import * as T from '@turf/turf';


/***| MAIN ABSTRACT CLASS |***/

export abstract class GeoData {


    /***| SHARED ATTRIBUTES |***/

    protected map!:L.Map;

    protected styleOuterBorders:L.PathOptions = { weight:2, color:'#00000060', fillOpacity:0 }
    protected styleRegion:L.PathOptions = { color:'#00000030', weight:1, dashArray:"1 2" }
    protected styleRegionHover:L.PathOptions = { color: '#00000090', weight:1, dashArray: '', fillOpacity: 0.8 };


    /***| ABSTRACT METHODS |***/

    public abstract display():void;


    /***| SHARED METHODS |***/

    public defineMap(m:L.Map) { this.map = m 
    }
    public clear() { 
        if (this.map) this.map.eachLayer((e:any) => { if (e instanceof L.GeoJSON) this.map.removeLayer(e)
        });
    }
    protected borders(data:any) { L.geoJSON(data, {style: this.styleOuterBorders}).addTo(this.map)
    }

    protected highlight = (e:any) => {
        var layer = e.target; 
        layer.options.originalStyle = layer.options.style;
        layer.setStyle(this.styleRegionHover);
        layer.bringToFront();
    }
    protected resetHighlight = (e:any) => {
        var layer = e.target; 
        layer.setStyle(layer.options.originalStyle);
        layer.bringToFront();
    }

    protected onEachFeature = (feature:any, layer:any) => {
        layer.on({
            mouseover: this.highlight,
            mouseout : this.resetHighlight,
        });
        feature.originalStyle = layer.options.style;
    }

}



/***| PRICES |***/

export class PricesGeoData extends GeoData {


    /***| INIT |***/

    private dataDistrictsLight:any;
    constructor(private _provider:DataProviderService) { super(); this._provider.getDistrictColorMap().subscribe( ds => this.dataDistrictsLight = ds );
    }


    /***| METHODS |***/

    public display() { 
        this.styleOuterBorders.color = '#000000A0'
        this.styleRegion.color = '#00000070'
        this.styleRegionHover.color = '#000000A0'
        this._provider.getBordersRaw().subscribe( d => { this.borders(d) }); this.data(); 
    }

    private data() {
        this._provider.getDistrictsRaw().subscribe( d => {
            
            if (!d) return;
            const districtLayers: L.GeoJSON<any>[] = [];

            d.features.forEach((district:any) => {
                
                let polygon = T.polygon(district.coordinates)
                let current = this.dataDistrictsLight.find((k:any) => T.booleanPointInPolygon([k.longitude, k.latitude] , polygon))

                let color   = (current) ? "#EE0000" : 'gold';
                let opacity = (current) ? parseFloat(current.mean_price) % 0.68 + 0.05 : 0.4;
                const layer = L.geoJSON(district, {
                    style: {
                        ...this.styleRegion,
                        fillColor: color,
                        fillOpacity: opacity,
                    },
                    onEachFeature: this.onEachFeature//.bind(this)
                });

                districtLayers.push(layer);

            })

            L.layerGroup(districtLayers).addTo(this.map);

        })
    }

}


/***| BLANK |***/

export class NeutralGeoData extends GeoData {

    constructor(private _provider:DataProviderService) { super();
    }
    public display() { this._provider.getBordersRaw().subscribe( d => { this.borders(d) })
    }

}


export class PopulationGeoData extends GeoData {
    
    constructor(private _provider:DataProviderService) { super();
    }

    public display() {
        console.log('Population')
    }
}
