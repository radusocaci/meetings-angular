import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {EventService} from "./shared/event.service";

@Injectable()
export class EventResolverService implements Resolve<any> {

  constructor(private eventService: EventService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.eventService.getEvent(route.params['id']); // auto subscribing
  }

}
