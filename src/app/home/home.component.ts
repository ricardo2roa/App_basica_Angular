import { Component, OnInit } from '@angular/core';
//Clase para promociones y platos
import {Dish} from "../shared/dish";
import {Promotion} from "../shared/promotion";
//Servicios
import {DishService} from "../services/dish.service";
import {PromotionService} from "../services/promotion.service";
import {LeaderService} from "../services/leader.service";
import {leader} from "../shared/leader";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: leader;
  constructor(private dish_svc:DishService,
              private promotion_svc:PromotionService,
              private leader_svc:LeaderService) { }

  ngOnInit(): void {
    this.dish_svc.getDishFeatured()
      .subscribe((dish)=>this.dish = dish);
    this.promotion_svc.getFeaturedPromotion()
      .subscribe((promotion)=>this.promotion = promotion);
    this.leader_svc.getLeaderFeatured()
      .subscribe((leader)=>this.leader = leader);
  }
}
