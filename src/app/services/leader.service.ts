import { Injectable } from '@angular/core';
import {LEADERS} from "../shared/leaders";
import {leader} from "../shared/leader";
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<leader[]>{
   /* return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(LEADERS),2000)
    });*/
    //return Promise.resolve(LEADERS);
    return of(LEADERS).pipe(delay(2000));//.toPromise();
  }

  getLeader(id:string):Observable<leader>{
    /*return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(LEADERS.filter((leader) => leader.id === id)[0]),2000)
    });*/
    //return Promise.resolve(LEADERS.filter((leader) => leader.id === id)[0]);
    return of(LEADERS.filter((leader) => leader.id === id)[0]).pipe(delay(2000));//.toPromise();
  }

  getLeaderFeatured():Observable<leader>{
    /*return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(LEADERS.filter((leader) => leader.featured)[0]),2000)
    });*/
    //return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));//.toPromise();
  }
}
