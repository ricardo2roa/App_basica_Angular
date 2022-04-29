import { Injectable } from '@angular/core';
import {Promotion} from "../shared/promotion";
import {PROMOTIONS} from "../shared/promotions";
import {Observable,of} from "rxjs";
import {map,catchError,delay} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../shared/baseUrl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]>{
    /*return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(PROMOTIONS),2000)
    });*/
    //return Promise.resolve(PROMOTIONS);
    //return of(PROMOTIONS).pipe(delay(2000))//.toPromise();
    return this.http.get<Promotion[]>(BaseURL+'promotions')
    .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getPromotion(id:string): Observable<Promotion>{
    /*return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]),2000)
    });*/
    //return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
    //return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000))//.toPromise()
    return this.http.get<Promotion>(BaseURL+'promotions/'+id)
    .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getFeaturedPromotion(): Observable<Promotion> {
    /*return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),2000)
    });*/
    //return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    //return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000))//.toPromise()
    return this.http.get<Promotion[]>(BaseURL+'promotions?featured=true')
    .pipe(map(promotions => promotions[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError))
  }

}
