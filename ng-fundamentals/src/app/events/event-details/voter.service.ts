import {Injectable} from '@angular/core';
import {Session} from "../shared/event.model";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Injectable()
export class VoterService {

  constructor(private http: HttpClient) {
  }

  deleteVoter(eventId: string, session: Session, userName: string): Observable<any> {
    let url = `/api/events/${eventId}/sessions/${session.name}/voters/${userName}`;

    return this.http.delete(url).pipe(catchError(this.handleError('deleteVoter')));
  }

  addVoter(eventId: string, session: Session, userName: string): Observable<any> {
    let options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    let url = `/api/events/${eventId}/sessions/${session.name}/voters/${userName}`;

    return this.http.post(url, {}, options).pipe(catchError(this.handleError('addVoter')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
