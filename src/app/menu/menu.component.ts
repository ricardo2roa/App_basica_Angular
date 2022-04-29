import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish'
import {DishService} from "../services/dish.service";
import { flyInOut, expand} from '../animations/app.animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  },
  animations:[
    flyInOut()
  ]
})
export class MenuComponent implements OnInit {

  errMess: string;

  constructor(private dishservice:DishService,
    @Inject('BaseURL') public BaseURL:string) { }

  dishes: Dish[];

  ngOnInit(): void {
     this.dishservice.getDishes()
      .subscribe((dishes)=>this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }

}
