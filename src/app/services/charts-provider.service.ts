import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartsProvider {

    constructor () { Chart.register(...registerables); 
    }    

}