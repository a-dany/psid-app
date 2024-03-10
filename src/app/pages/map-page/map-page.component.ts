import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent implements OnInit {

  public rawDistricts!:any;

  constructor() {}
  ngOnInit() {
  }

}
