import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent implements OnInit {
  @Input() private count;
  @Input() private voted;
  // @Input() set voted { ALSO ADD [style.color] binding to heartColor
  //   this.heartColor = val ? 'red' : 'white'; INPUT SETTER
  // }
  @Output() vote = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.vote.emit({});
  }
}
