import { Injectable } from '@angular/core';
import {Promotion} from "../shared/promotion";
import {PROMOTIONS} from "../shared/promotions";
import {Observable,of} from "rxjs";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]>{
    /*return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(PROMOTIONS),2000)
    });*/
    //return Promise.resolve(PROMOTIONS);
    return of(PROMOTIONS).pipe(delay(2000))//.toPromise();
  }

  getPromotion(id:string): Observable<Promotion>{
    /*return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]),2000)
    });*/
    //return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000))//.toPromise()
  }

  getFeaturedPromotion(): Observable<Promotion> {
    /*return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),2000)
    });*/
    //return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000))//.toPromise()
  }

}
