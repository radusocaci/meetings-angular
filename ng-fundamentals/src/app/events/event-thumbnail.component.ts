import {Component, Input} from "@angular/core";
import {EventModel} from "./shared/event.model";

@Component({
  selector: "event-thumbnail",
  template: `
    <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
      <h2>{{event?.name | uppercase}}</h2>
      <div>Date: {{event?.date}}</div>
      <div [ngStyle]="getStartTimeStyle()" [ngSwitch]="event?.time">
        Time: {{event?.time}}
        <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
        <span *ngSwitchCase="'10:00 am'">(Normal Start)</span>
        <span *ngSwitchDefault>(Late Start)</span>
      </div>
      <div>Price: {{event?.price | currency: 'USD'}}</div>
      <div *ngIf="event?.location?.address">
        <span>Location: {{event?.location?.address}}</span>
        <span>&nbsp;</span>
        <span>{{event?.location?.city}}, {{event?.location?.country}}</span>
      </div>
      <div *ngIf="event?.onlineUrl">
        <span>Online URL: {{event?.onlineUrl}}</span>
      </div>
    </div>
  `,
  styles: [`
    .thumbnail {min-height: 210px;}
  `]
})
export class EventThumbnailComponent {
  @Input() event: EventModel;

  getStartTimeStyle():any {
    if(this.event && this.event.time === '8:00 am')
      return {color: 'green', 'font-weight': 'bold'};
    else if(this.event && this.event.time != '10:00 am')
      return {color: 'red', 'font-weight': 'bold'};
    else
      return {};
  }
}
