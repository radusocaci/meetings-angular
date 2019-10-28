import {AuthService} from "../../../user/auth.service";
import {VoterService} from "../voter.service";
import {SessionListComponent} from "./session-list.component";
import {Session} from "../../shared/event.model";

// UNIT TEST on component
describe('sessionListComponent', () => {
  let component: SessionListComponent;
  let authService: AuthService, voterService: VoterService;

  beforeEach(() => {
    // no need to actually mock dep because they are not used in ngOnChanges
    component = new SessionListComponent(authService, voterService);
  });

  describe('ngOnChanges', () => {
    it('should filter the session correctly', function () {
      component.sessions = <Session[]>[
        {name: 'session 1', level: 'intermediate'},
        {name: 'session 2', level: 'beginner'},
        {name: 'session 3', level: 'intermediate'}
      ];
      component.filterBy = 'intermediate';
      component.sortedBy = 'name';

      component.ngOnChanges();

      expect(component.visibleSessions.length).toBe(2);
    });

    it('should sort the session correctly', function () {
      component.sessions = <Session[]>[
        {name: 'session 1', level: 'intermediate'},
        {name: 'session 2', level: 'beginner'},
        {name: 'session 3', level: 'intermediate'}
      ];
      component.filterBy = 'all';
      component.sortedBy = 'name';

      component.ngOnChanges();

      expect(component.visibleSessions[2].name).toBe('session 3');
    });
  })
});
