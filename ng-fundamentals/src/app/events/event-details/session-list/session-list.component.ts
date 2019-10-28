import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Session} from "../../shared/event.model";
import {AuthService} from "../../../user/auth.service";
import {VoterService} from "../voter.service";

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: Session[];
  @Input() filterBy;
  @Input() sortedBy;
  @Input() eventId;

  visibleSessions: Session[];

  constructor(private auth: AuthService, private voterService: VoterService) {

  }

  ngOnChanges(): void {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortedBy === 'name'
        ? this.visibleSessions.sort(sortByName)
        : this.visibleSessions.sort(sortByVoters); // mutable sort(in-place)
    }
  }

  private filterSessions(filter: any) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0); // return a copy by slicing at 0 index
    } else {
      this.visibleSessions = this.sessions.filter((s) => s.level.toLocaleLowerCase() === filter);
    }
  }

  toggleVote(session: Session) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName).subscribe();
      session.voters = session.voters.filter(voter => voter !== this.auth.currentUser.userName);
    } else {
      this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName).subscribe();
      session.voters.push(this.auth.currentUser.userName);
    }

    if (this.sortedBy === 'voters') {
      this.visibleSessions.sort(sortByVoters);
    }
  }

  userHasVoted(session: Session): boolean {
    return session.voters.some(voter => voter === this.auth.currentUser.userName); // checks if username exists in voters array
    // return session.voters.indexOf(userName) > -1;
  }
}

function sortByName(s1: Session, s2: Session) {
  if (s1.name < s2.name) {
    return -1;
  } else if (s1.name === s2.name) {
    return 0;
  } else {
    return 1;
  }
}

function sortByVoters(s1: Session, s2: Session) {
  return s2.voters.length - s1.voters.length;
}
