import {Injectable} from '@angular/core';
import {Resolve} from "@angular/router";
import {EventService} from "./shared/event.service";
import {map} from "rxjs/operators";

@Injectable()
export class EventListResolverService implements Resolve<any> {
  constructor(private eventService: EventService) {
  }

  resolve() {
    return this.eventService.getEvents(); // subscribing is done automatically in a resolver
  }
}
