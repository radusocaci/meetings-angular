import {Component, OnInit, Output} from "@angular/core";
import {EventService} from "./shared/event.service";
import {ActivatedRoute} from "@angular/router";
import {EventModel} from "./shared/event.model";

@Component({
  selector: "eevent-list",
  template: `
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr>
      <div class="row">
        <div class="col-md-5 thumbnail" *ngFor="let event of events">
          <event-thumbnail [event]="event"></event-thumbnail>
        </div>
      </div>
    </div>
  `
})
export class EventListComponent implements OnInit {
  events: EventModel[];

  constructor(private eventService: EventService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.events = this.route.snapshot.data['events'];
  }
}



