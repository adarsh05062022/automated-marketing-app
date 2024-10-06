import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-accept-or-deny',
  templateUrl: './accept-or-deny.component.html',
  styleUrls: ['./accept-or-deny.component.css']
})
export class AcceptOrDenyComponent {
  @Input() message: string = "Are you sure?"; // Default message if not provided

  constructor(public modalRef: MdbModalRef<AcceptOrDenyComponent>) {}

  accept() {
    this.modalRef.close(true); // Return true when accepted
  }

  deny() {
    this.modalRef.close(false); // Return false when denied
  }
}
