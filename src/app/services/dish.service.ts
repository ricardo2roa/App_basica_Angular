import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish'
import {DISHES} from '../shared/dishes'
import {Observable, of} from 'rxjs';
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]>{
    //return Promise.resolve(DISHES);
    //Implementacion con Promesa
    /*return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(DISHES),2000)
    });*/
    //fin
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id:string): Observable<Dish>{
    //Implementacion con Promesa
    /*return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(DISHES.filter((dish) => dish.id === id)[0]),2000)
    });*/
    return of(DISHES.filter((dish) => dish.id === id)[0]).pipe(delay(2000));//.toPromise();
  }

  getDishFeatured():Observable<Dish>{
    //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
   /* return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(DISHES.filter((dish) => dish.featured)[0]),2000)
    });*/
    return of(DISHES.filter((dish)=> dish.featured)[0]).pipe(delay(2000));//.toPromise()
  }

  getDishIds(): Observable<string[] | any>{
    return of(DISHES.map(dish => dish.id));
  }
}
