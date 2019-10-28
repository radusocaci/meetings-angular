import {Component, OnInit} from '@angular/core';
import {AuthService} from "../user/auth.service";
import {EventService} from "../events/shared/event.service";
import {EventModel} from "../events/shared/event.model";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private foundEvents: Event[];
  sessionName: string = '';
  private events: EventModel[];

  constructor(private auth: AuthService, private eventService: EventService) {
  }

  searchSession(sessionName) {
    this.eventService.searchSession(sessionName).subscribe((events) => {
      this.foundEvents = events;
    })
  }

  // subscribe to the events observable
  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events) => this.events = events);
  }
}
