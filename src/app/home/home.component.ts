import { Component, OnInit } from '@angular/core';
//Clase para promociones y platos
import {Dish} from "../shared/dish";
import {Promotion} from "../shared/promotion";
//Servicios
import {DishService} from "../services/dish.service";
import {PromotionService} from "../services/promotion.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  constructor(private dish_svc:DishService, private promotion_svc:PromotionService) { }

  ngOnInit(): void {
    this.dish = this.dish_svc.getDishFeatured();
    this.promotion = this.promotion_svc.getFeaturedPromotion();
  }
}
