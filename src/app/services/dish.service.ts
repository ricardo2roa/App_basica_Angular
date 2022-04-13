import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish'
import {DISHES} from '../shared/dishes'

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]>{
    //return Promise.resolve(DISHES);
    return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(DISHES),2000)
    });
  }

  getDish(id:string): Promise<Dish>{
    return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(DISHES.filter((dish) => dish.id === id)[0]),2000)
    });

  }

  getDishFeatured():Promise<Dish>{
    //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
    return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(DISHES.filter((dish) => dish.featured)[0]),2000)
    });
  }
}
