import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';
import { AppComponent } from './app.component';
import { PriceGraphComponent } from './price-graph/price-graph.component';
import { HttpClientModule } from '@angular/common/http';
import { jqxDropDownListComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownlist';

@NgModule({
  declarations: [
    AppComponent,
    jqxChartComponent,
    jqxDropDownListComponent,
    PriceGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
