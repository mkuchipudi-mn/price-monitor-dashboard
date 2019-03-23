import { HttpErrorResponse } from '@angular/common/http';
import { PriceGraphService } from './price-graph.service';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';



@Component({
  selector: 'app-price-graph',
  templateUrl: './price-graph.component.html',
  styleUrls: ['./price-graph.component.css']
})
export class PriceGraphComponent implements AfterViewInit, OnInit {

  data: any[] = [];
  padding: any = { left: 5, top: 5, right: 5, bottom: 5 };

  titlePadding: any = { left: 0, top: 0, right: 0, bottom: 10 };
  @ViewChild('myChart') myChart: jqxChartComponent;
  colorsSchemesList: string[] = ['scheme01', 'scheme02', 'scheme03', 'scheme04', 'scheme05', 'scheme06', 'scheme07', 'scheme08'];
  seriesList: string[] = ['splinearea', 'spline', 'column', 'scatter', 'stackedcolumn', 'stackedsplinearea', 'stackedspline'];
  xAxis: any =
  {
      dataField: 'time',
      type: 'date',
      baseUnit: 'second',
      title: { text: 'Time' },
      unitInterval: 15,
      formatFunction: (value: any) => {
          return jqx.dataFormat.formatdate(value, 'hh:mm:ss', 'en-us');
      },
      gridLines: { step: 2 },
      valuesOnTicks: true,
      labels: { angle: -45, offset: { x: -17, y: 0 } }
  };

  seriesGroups: any[] =
  [
      {
          type: 'line',
          columnsGapPercent: 50,
          alignEndPointsWithIntervals: true,

          valueAxis:
          {
              minValue: -1,
              maxValue: 1,
              showTickMarks: true,
              tickMarksColor: '#0000FF',
              title: { text: 'Price' }
          },
          series: [
              { dataField: 'price', displayText: 'price', opacity: 1, lineWidth: 1,
              symbolType: 'circle', fillColorSymbolSelected: 'white', symbolSize: 20, stroke: 'yellow' }
          ]
      }
  ];
 constructor(private  priceGraphService: PriceGraphService) {}

 async ngOnInit() {
  this.data = this.priceGraphService.generateRandomChartData();

  }


  public getWidth(): string|number {
    if (document.body.offsetWidth < 850) {
      return '90%';
  }
  return 1050;
}

  ngAfterViewInit(): void {
      const data = this.myChart.source();
      let multiplier = -1;
       setInterval(() => {
          const max = 1;
          if (data.length >= 60) {
              data.splice(0, 1);
          }

          const timestamp = new Date();
          timestamp.setSeconds(timestamp.getSeconds());
          timestamp.setMilliseconds(0);
          data.push({ time: timestamp, price: Math.max(-1, (Math.random() * multiplier * 1) % max) });
          multiplier = -1 * (multiplier);
          this.myChart.update();
      }, 1000);
  }



  colorsOnChange(event: any): void {
    const value = event.args.item.value;
    this.myChart.colorScheme(value);
    this.myChart.update();
}

  seriesOnChange(event: any): void {
    const args = event.args;
    if (args) {
      const value = args.item.value;
        this.myChart.seriesGroups()[0].type = value;
        this.myChart.update();
    }
}


}
