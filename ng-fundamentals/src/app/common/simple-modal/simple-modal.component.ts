import {Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';
import {JQ_TOKEN} from "../jQuery.service";

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.css']
})
export class SimpleModalComponent {
  @Input() title;
  @Input() elementId;
  @Input() closeOnBodyClick;
  @ViewChild('modalcontainer', {static: false}) modalRef: ElementRef;

  constructor(@Inject(JQ_TOKEN) private $: any) {
  }

  closeModal() {
    if (this.closeOnBodyClick.toLocaleLowerCase() === 'true') {
      this.$(this.modalRef.nativeElement).modal('hide');
    }
  }
}
