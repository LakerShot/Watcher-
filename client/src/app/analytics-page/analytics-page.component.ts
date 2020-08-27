import { Subscription } from 'rxjs';
import { AnalyticsService } from './../shared/services/analytics.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnaliticsPage } from '../shared/interfaces';
import { Chart } from 'chart.js'
@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef
  average: number
  pending = true
  aSub: Subscription

  constructor(
    private service: AnalyticsService
  ) { }

  ngAfterViewInit() {

    const gainCongig: any = {
      label: 'Proceeds',
      color: 'rgb(172, 147, 208)',
      type: 'bar',
      backgroundColor: 'rgb(231, 157, 164)'
    }

    const orderConfig: any = {
      label: 'Order',
      color: 'rgb(204, 101, 43)',
      type: 'line'
    }

    this.aSub = this.service.getAnalytics().subscribe((data: AnaliticsPage) => {
      this.average = data.average
      gainCongig.labels = data.chart.map(item => item.lable)
      gainCongig.data = data.chart.map(item => item.gain)

      orderConfig.labels = data.chart.map(item => item.lable)
      orderConfig.data = data.chart.map(item => item.order)


      const gainCtx = this.gainRef.nativeElement.getContext('2d')
      const orderCtx = this.orderRef.nativeElement.getContext('2d')
      gainCtx.canvas.height = '300px'
      orderCtx.canvas.height = '300px'
      
      new Chart(gainCtx, createChartConfig(gainCongig))
      new Chart(orderCtx, createChartConfig(orderConfig))

      this.pending = false
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}

function createChartConfig({labels, data, label, color, type, backgroundColor}) {
  return {
    type,
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          backgroundColor
        }
      ]
    }
  }
}