import { DataProviderService } from '../services/data-provider.service';
import * as L from 'leaflet';
import * as T from '@turf/turf';
import { MapTypes } from './map.types';


/***| MAIN ABSTRACT CLASS |***/

export abstract class GeoData {


    /***| SHARED ATTRIBUTES |***/

    protected map!:L.Map;

    protected styleOuterBorders:L.PathOptions = { weight:2, color:'#00000060', fillOpacity:0 }
    protected styleRegion:L.PathOptions = { color:'#00000030', weight:1, dashArray:"1 2" }
    protected styleRegionHover:L.PathOptions = { color: '#00000090', weight:1, dashArray: '', fillOpacity: 0.8 };


    protected opacityMax:number = 0.68;
    protected opacityMin:number = 0.05;
    protected opacityMed:number = 0.40;


    protected numberFormat = new Intl.NumberFormat('eu', {
        useGrouping: true
    });

    /***| ABSTRACT METHODS |***/

    public abstract display():void;
    public abstract title():MapTypes;


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
    }

}



/***| PRICES |***/

export class PricesGeoData extends GeoData {


    /***| INIT |***/

    private dataDistrictsLight:any;
    constructor(private _provider:DataProviderService) { super(); this._provider.getDistrictEstatePrices().subscribe( ds => this.dataDistrictsLight = ds );
    }


    /***| METHODS |***/

    public title() { return MapTypes.Prices }

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
                let opacity = (current) ? parseFloat(current.mean_price) % this.opacityMax + this.opacityMin : this.opacityMed;
                const layer = L.geoJSON(district, {
                    style: {
                        ...this.styleRegion,
                        fillColor: color,
                        fillOpacity: opacity,
                    },
                    onEachFeature: this.onEachFeature//.bind(this)
                });
                layer.bindTooltip( (current) ? `<span class="font-bold">${current.quartier.replace(/,.*?$/, '')}</span><br/>${this.numberFormat.format(current.mean_price)} €` : 'No data found' )

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
    public title() { return MapTypes.Neutral }
    public display() { 
        this.styleRegion.fillOpacity = 0;
        this.styleRegion.fillColor = '#fff';
        this.styleRegion.dashArray = '1 1'
        this.styleRegion.color = '#00000025'
        this.styleOuterBorders.color = '#00000050'
        this.styleOuterBorders.className = 'map-shadow'

        this._provider.getBordersRaw().subscribe( d => { this.borders(d) }); this.data()
    }

    private data() {
        this._provider.getDistrictsRaw().subscribe( d => {
            d.features.forEach((district:any) => {
                L.geoJSON(district, { style: this.styleRegion
                })
                .addTo(this.map)
            })
        });
    }

}


/***| POPULATION |***/

export class PopulationGeoData extends GeoData {
    
    private dataDistrictsLight:any;
    constructor(private _provider:DataProviderService) { super(); this._provider.getDistrictPopulation().subscribe( ds => this.dataDistrictsLight = ds );
    }

    public title() { return MapTypes.Population }
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

                let color   = (current) ? "#00EE00" : 'gold';
                let opacity = (current) ? parseFloat(current.population) % this.opacityMax + this.opacityMin : this.opacityMed;
                const layer = L.geoJSON(district, {
                    style: {
                        ...this.styleRegion,
                        fillColor: color,
                        fillOpacity: opacity,
                    },
                    onEachFeature: this.onEachFeature//.bind(this)
                });

                layer.bindTooltip( (current) ? `<span class="font-bold">${current.name.replace(/,.*?$/, '')}</span><br/>${this.numberFormat.format(current.population)} hab` : 'No data found' )
                districtLayers.push(layer);

            })

            L.layerGroup(districtLayers).addTo(this.map);

        })
    }

}
