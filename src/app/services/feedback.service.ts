import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { feedback } from '../shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { BaseURL } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(public http:HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  submitFeedback(feedback:feedback):Observable<feedback>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post<feedback>(BaseURL+'feedback/',feedback, httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
