import { Injectable } from '@angular/core';
import {LEADERS} from "../shared/leaders";
import {leader} from "../shared/leader";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<leader[]>{
    return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(LEADERS),2000)
    });
    //return Promise.resolve(LEADERS);
  }

  getLeader(id:string):Promise<leader>{
    return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(LEADERS.filter((leader) => leader.id === id)[0]),2000)
    });
    //return Promise.resolve(LEADERS.filter((leader) => leader.id === id)[0]);
  }

  getLeaderFeatured():Promise<leader>{
    return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(LEADERS.filter((leader) => leader.featured)[0]),2000)
    });
    //return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  }
}
