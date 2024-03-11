import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../services/data-provider.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent implements OnInit {

  public rawDistricts!:any;

  constructor(private _data:DataProviderService) {}
  ngOnInit() {
    this._data.getDistrictsRaw().subscribe( data => this.rawDistricts = JSON.parse(data)
    )
  }

}
