import {VoterService} from './voter.service';
import {Session} from "../shared/event.model";
import {of} from "rxjs";

// UNIT TEST on service
describe('VoterService', () => {
  let voterService: VoterService;
  let mockHttp;

  beforeEach(() => {
    // mock the http service
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    voterService = new VoterService(mockHttp);
  });

  describe('deleteVoter', () => {
    it('should remove the voter from the list', () => {
      let session = {id: 6, voters: ['radu', 'isabela']};

      // by default returns undefined, but we call pipe on it, so we need it to return an Observable
      mockHttp.delete.and.returnValue(of(false));

      // hardcoded values and mocked http service
      voterService.deleteVoter('sadas', <Session>session, 'radu');

      // fails because we remove elements from session voters in session list component
      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('radu');
    });

    it('should call http delete with correct URL', function () {
      let session = {name: 'sth', id: 6, voters: ['radu', 'isabela']};

      // by default returns undefined, but we call pipe on it, so we need it to return an Observable
      mockHttp.delete.and.returnValue(of(false));

      voterService.deleteVoter('sadas', <Session>session, 'radu');

      expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/sadas/sessions/sth/voters/radu');
    });
  });

  describe('addVoter', () => {
    it('should call http post with correct URL', function () {
      let session = {name: 'sth', id: 6, voters: ['radu', 'isabela']};

      // by default returns undefined, but we call pipe on it, so we need it to return an Observable
      mockHttp.post.and.returnValue(of(false));

      voterService.addVoter('sadas', <Session>session, 'radu');

      // check that any object was passed instead of specific options check
      expect(mockHttp.post)
        .toHaveBeenCalledWith('/api/events/sadas/sessions/sth/voters/radu', {}, jasmine.any(Object));
    });
  })
});
