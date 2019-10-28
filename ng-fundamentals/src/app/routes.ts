import {EventListComponent} from "./events/event-list.component";
import {EventDetailsComponent} from "./events/event-details/event-details.component";
import {Routes} from "@angular/router";
import {CreateEventComponent} from "./events/create-event/create-event.component";
import {Error404Component} from "./errors/error404/error404.component";
import {EventListResolverService} from "./events/event-list-resolver.service";
import {CreateSessionComponent} from "./events/create-session/create-session.component";
import {EventResolverService} from "./events/event-resolver.service";

export const appRoutes: Routes = [
  {path: 'events', component: EventListComponent, resolve: {events: EventListResolverService}},
  {path: 'events/event/new', component: CreateSessionComponent},
  {path: 'events/new', component: CreateEventComponent, canDeactivate: ['checkDeactivate']}, // needs to be above, matched first, otherwise will take as id
  {path: 'events/:id', component: EventDetailsComponent, resolve: {event: EventResolverService}},
  {path: '', redirectTo: '/events', pathMatch: 'full'},
  {path: '404', component: Error404Component},
  {path: 'user', loadChildren: './user/user.module#UserModule'} // for different module
];
