import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {EventsAppComponent} from './events-app.component';
import {EventListComponent} from "./events/event-list.component";
import {EventThumbnailComponent} from "./events/event-thumbnail.component";
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {EventService} from "./events/shared/event.service";
import {Toastr, TOASTR_TOKEN} from "./common/toastr.service";
import {EventDetailsComponent} from './events/event-details/event-details.component';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./routes";
import {CreateEventComponent} from './events/create-event/create-event.component';
import {Error404Component} from './errors/error404/error404.component';
import {EventListResolverService} from "./events/event-list-resolver.service";
import {AuthService} from "./user/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateSessionComponent} from './events/create-session/create-session.component';
import {SessionListComponent} from './events/event-details/session-list/session-list.component';
import {CollapsibleWellComponent} from './common/collapsible-well/collapsible-well.component';
import {DurationPipe} from './events/shared/duration.pipe';
import {JQ_TOKEN} from "./common/jQuery.service";
import {SimpleModalComponent} from './common/simple-modal/simple-modal.component';
import {ModalTriggerDirective} from './common/modal-trigger.directive';
import {UpvoteComponent} from './events/event-details/upvote/upvote.component';
import {VoterService} from "./events/event-details/voter.service";
import {LocationValidatorDirective} from './events/shared/location-validator.directive';
import {HttpClientModule} from "@angular/common/http";
import {EventResolverService} from "./events/event-resolver.service";

let toastr: Toastr = window['toastr'];
let jquery = window['$'];

@NgModule({
  declarations: [
    EventsAppComponent,
    EventListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidatorDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    EventService,
    {provide: TOASTR_TOKEN, useValue: toastr},
    {provide: JQ_TOKEN, useValue: jquery},
    EventResolverService,
    EventListResolverService,
    AuthService, // shared with all modules
    {provide: 'checkDeactivate', useValue: checkDirtyState},
    VoterService
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule {
}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }

  return true;
}
