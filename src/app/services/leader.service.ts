import { Injectable } from '@angular/core';
import {LEADERS} from "../shared/leaders";
import {leader} from "../shared/leader";
import {Observable, of} from "rxjs";
import {catchError, map,delay} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../shared/baseUrl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,
    private processHTTPmsg:ProcessHTTPMsgService) { }

  getLeaders(): Observable<leader[]>{
   /* return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(LEADERS),2000)
    });*/
    //return Promise.resolve(LEADERS);
    //return of(LEADERS).pipe(delay(2000));//.toPromise();
    return this.http.get<leader[]>(BaseURL+'leadership')
    .pipe(catchError(this.processHTTPmsg.handleError));
  }

  getLeader(id:string):Observable<leader>{
    /*return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(LEADERS.filter((leader) => leader.id === id)[0]),2000)
    });*/
    //return Promise.resolve(LEADERS.filter((leader) => leader.id === id)[0]);
    //return of(LEADERS.filter((leader) => leader.id === id)[0]).pipe(delay(2000));//.toPromise();
    return this.http.get<leader>(BaseURL+'leadership/'+id)
    .pipe(catchError(this.processHTTPmsg.handleError));
  }

  getLeaderFeatured():Observable<leader>{
    /*return new Promise(resolve =>{
      //Simulacion de retraso de 2 seg (latencia en el servidor)
      setTimeout(()=>resolve(LEADERS.filter((leader) => leader.featured)[0]),2000)
    });*/
    //return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
    //return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));//.toPromise();
    return this.http.get<leader[]>(BaseURL+'leadership?featured=true')
    .pipe(map( leaders => leaders[0])).pipe(catchError(this.processHTTPmsg.handleError));
  }
}
