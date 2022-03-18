import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish'
import {DISHES} from '../shared/dishes'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[] = DISHES
  selectedDish: Dish
  constructor() { }

  ngOnInit(): void {
  }

  selectDish(int:string){
    this.selectedDish = DISHES[parseInt(int)];
    console.log(this.selectedDish.comments)
  }
}
