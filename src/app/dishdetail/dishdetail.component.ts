import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../shared/dish";
import {ActivatedRoute, Params} from "@angular/router";
import {DishService} from "../services/dish.service";
import {Location} from "@angular/common";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  //@Input() selectedDish: Dish;
  selectedDish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  constructor(private activateroute:ActivatedRoute,
              private dishservice:DishService,
              private location:Location) {
  }

  ngOnInit(): void {
    this.dishservice.getDishIds()
    .subscribe(dishIds => this.dishIds = dishIds);
    //snapshot -> toma una captura del valor observable
    this.activateroute.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => {this.selectedDish = dish; this.setPrevNext(dish.id);});
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index -1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index +1) % this.dishIds.length];
  }

  goBack():void{
    this.location.back();
  }
}
