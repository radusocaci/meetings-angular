import {Component, OnInit} from '@angular/core';
import {EventService} from "../shared/event.service";
import {ActivatedRoute, Params} from "@angular/router";
import {EventModel, Session} from "../shared/event.model";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: EventModel;
  addMode: boolean;
  filterBy: string = 'all';
  sortedBy: string = 'name';

  constructor(private eventService: EventService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // can do foreach on data directly
    this.route.params.forEach((params: Params) => { // will allow routing from the same component, since we are subscribing to an observable now
      this.event = this.route.snapshot.data['event'];
      this.resetState(); // reset state when navigating to another component
    });

    // this.event = this.eventService.getEvent( +this.route.snapshot.params['id']); // old code which does not allow routing from same component
  }

  resetState(): void {
    this.addMode = false;
    this.filterBy = 'all';
    this.sortedBy = 'name';
  }

  addSession() {
    this.addMode = true;
  }

  saveSession(session: Session) {
    let nextId;
    if (!this.event.sessions) {
      this.event.sessions = [];
      nextId = 1;
    } else {
      nextId = Math.max.apply(null, this.event.sessions.map(s => s.id)) + 1;
    }

    session.id = nextId;

    this.event.sessions.push(session);

    this.eventService.saveEvent(this.event).subscribe(() => {
      this.addMode = false;
    });
  }

  cancelAddSession() {
    this.addMode = false;
  }
}
