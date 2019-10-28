import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Session} from "../shared/event.model";
import {restrictedWords} from "../shared/restricted-words.validator";

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
  @Output() newSessionEvent = new EventEmitter();
  @Output() cancelAddSession = new EventEmitter();

  newSessionForm: FormGroup;
  name: FormControl;
  presenter: FormControl;
  duration: FormControl;
  level: FormControl;
  abstract: FormControl;

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [Validators.required,
      Validators.maxLength(400),
      restrictedWords(['foo', 'coo'])]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    })
  }

  saveSession(newSession) {
    let session: Session = {
      id: undefined,
      name: newSession.name,
      duration: +newSession.duration,
      abstract: newSession.abstract,
      level: newSession.level,
      presenter: newSession.presenter,
      voters: []
    };

    this.newSessionEvent.emit(session);
  }

  cancel() {
    this.cancelAddSession.emit();
  }
}
