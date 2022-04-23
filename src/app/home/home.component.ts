import { Component, Inject, OnInit } from '@angular/core';
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
  dishErrMess:string;
  promotionErrMess:string;
  leaderErrMess:string;
  constructor(private dish_svc:DishService,
              private promotion_svc:PromotionService,
              private leader_svc:LeaderService,
              @Inject('BaseURL') public BaseURL:string ) { }

  ngOnInit(): void {
    this.dish_svc.getDishFeatured()
      .subscribe((dish)=>this.dish = dish,
      errmess => this.dishErrMess=errmess);
    this.promotion_svc.getFeaturedPromotion()
      .subscribe((promotion)=>this.promotion = promotion,
      errmess => this.promotionErrMess=errmess);
    this.leader_svc.getLeaderFeatured()
      .subscribe((leader)=>this.leader = leader,
      errmess => this.leaderErrMess=errmess);
  }
}
