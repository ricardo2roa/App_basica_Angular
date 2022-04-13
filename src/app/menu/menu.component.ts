import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish'
import {DishService} from "../services/dish.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private dishservice:DishService) { }

  dishes: Dish[];
  selectedDish: Dish

  ngOnInit(): void {
     this.dishservice.getDishes()
      .then((dishes)=>this.dishes = dishes);
  }

  selectDish(int:string){
    this.selectedDish = this.dishes[parseInt(int)];
    console.log(this.selectedDish.comments)
  }
}
