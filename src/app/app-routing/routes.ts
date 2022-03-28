import {Routes} from "@angular/router";
//Componentes
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { MenuComponent } from '../menu/menu.component'


export const routes: Routes = [
  {path:'home', component:HomeComponent},
  //{path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent},
  {path:'menu', component:MenuComponent},
  //{path:'dishdetail', component:DishdetailComponent},
  {path:'', redirectTo:'/home', pathMatch:'full'}
];
