import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../shared/dish";
import {ActivatedRoute} from "@angular/router";
import {DishService} from "../services/dish.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  //@Input() selectedDish: Dish;
  selectedDish: Dish;

  constructor(private activateroute:ActivatedRoute,
              private dishservice:DishService,
              private location:Location) {
    this.activateroute.params.subscribe(parameter =>{
      this.dishservice.getDish(parameter.id)
        .subscribe((dish)=> this.selectedDish = dish);
      console.log(this.selectedDish)
    });
  }

  ngOnInit(): void {
  }

  goBack():void{
    this.location.back();
  }
}
