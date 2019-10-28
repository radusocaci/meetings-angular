import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SessionListComponent} from "./session-list.component";
import {DebugElement} from "@angular/core";
import {AuthService} from "../../../user/auth.service";
import {VoterService} from "../voter.service";
import {UpvoteComponent} from "../upvote/upvote.component";
import {DurationPipe} from "../../shared/duration.pipe";
import {CollapsibleWellComponent} from "../../../common/collapsible-well/collapsible-well.component";

// DEEP INTEGRATED TEST on component (uses other child components such as collapsible well, etc)
describe('SessionListComponent', () => {
  let fixture: ComponentFixture<SessionListComponent>, // wrapper around component
    component: SessionListComponent, // actual component
    debugEl: DebugElement, // wrapper around html element + debug
    element: HTMLElement; // native html element

  // before is by default async. The async function will make it sync (needs to be sync)
  // needs to complete before component initialization
  beforeEach(async(() => {
    let mockAuthService = {
        isAuthentificated: () => true, // need this functionality in ngOnChanges
        currentUser: {userName: 'socaciradu'}
      },
      mockVoterService = {};

    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SessionListComponent,
        UpvoteComponent, // need to declare all components part of this component
        DurationPipe,
        CollapsibleWellComponent
      ],
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        {provide: VoterService, useValue: mockVoterService}
      ],
      schemas: []
    })
  }));

  // use another beforeEach to set up component (async this time)
  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  });

  describe('initial display', () => {
    it('should have the correct session title', function () {
      component.sessions = [
        {
          id: 1,
          name: 'Session 1',
          level: 'beginner',
          voters: ['john', 'bob'],
          presenter: 'Joe',
          abstract: 'abstract',
          duration: 1
        }
      ];
      component.filterBy = 'all';
      component.sortedBy = 'name';

      component.ngOnChanges();
      fixture.autoDetectChanges(true);

      expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
    });
  })
});
