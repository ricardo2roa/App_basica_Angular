import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish'
import {DishService} from "../services/dish.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
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
