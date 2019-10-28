import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {EventModel} from "../shared/event.model";
import {EventService} from "../shared/event.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  isDirty: boolean = true;
  newEvent: EventModel;

  constructor(private eventService: EventService, private router: Router) {
  }

  saveEvent(formValues) {
    this.eventService.saveEvent(formValues).subscribe(() => {
      this.isDirty = false; // pass route guard
      this.router.navigate(['events']);
    });
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
