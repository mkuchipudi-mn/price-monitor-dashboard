import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { PriceGraph } from './price-graph.model';

@Injectable({
  providedIn: 'root'
})
export class PriceGraphService {

  data: PriceGraph[] = [];

  constructor(private _http: HttpClient) {}

  public getMockChartData(): Observable<PriceGraph[] | HttpErrorResponse> {
  return this._http.get('../../../server/mockData.json').pipe(
   map((response: PriceGraph[]) => {this.data = response; return response;}),
   catchError((errorResponse: HttpErrorResponse): Observable<HttpErrorResponse> => of(errorResponse)));
  }




  public generateRandomChartData(): PriceGraph[]  {
      const data: PriceGraph[] = [];
      const max = 1;
      const timestamp = new Date();
      let multiplier = -1;
      for (let i = 0; i < 60; i++) {
          timestamp.setMilliseconds(0);
          timestamp.setSeconds(timestamp.getSeconds() - 1);

          data.push({ time: new Date(timestamp.valueOf()), price: Math.max(-1, (Math.random() * multiplier * 1) % max) })
          multiplier = -1 * (multiplier);
        }
      return data.reverse();
    }

  }




