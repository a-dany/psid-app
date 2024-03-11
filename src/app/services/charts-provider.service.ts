import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HistogramDataset } from '../interfaces/HistogramDataset';

@Injectable({
  providedIn: 'root'
})
export class ChartsProvider {


  constructor() { Chart.register(...registerables);
  }


  public histogram(labels:number[], datasets:HistogramDataset[], xTitle:string, yTitle:string, canvas: HTMLCanvasElement, step:number = 1): void {

    const context = canvas.getContext('2d');

    if (context) new Chart(
      context, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        scales: {
          x: {
            title: { display: true, text: xTitle
            }
          },
          y: {
            title: { display: true, text: yTitle
            }
          }
        }
      }
    });

  }


  public pieChart(labels: string[], data: number[], backgroundColor: string[], borderColor: string[], borderWidth: number, canvas: HTMLCanvasElement): void {
  const context = canvas.getContext('2d');
  if (context) {
    new Chart(
      context, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: borderWidth
          }]
        }
      }
    );
  }
}

public priceHistogram(labels: string[], datasets: HistogramDataset[], xTitle: string, yTitle: string, canvas: HTMLCanvasElement): void {
  const context = canvas.getContext('2d');
  if (context) {
    new Chart(context, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        scales: {
          x: {
            title: { display: true, text: xTitle }
          },
          y: {
            title: { display: true, text: yTitle }
          }
        }
      }
    });
  }
}
}
