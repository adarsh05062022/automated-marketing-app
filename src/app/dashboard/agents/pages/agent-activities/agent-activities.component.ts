import { Component } from '@angular/core';
import { Campaign } from '../../../../interfaces/Post.interface';
import { PostViewDialogComponent } from '../../../shared/post-view-dialog/post-view-dialog.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-agent-activities',
  templateUrl: './agent-activities.component.html',
  styleUrl: './agent-activities.component.css',
})
export class AgentActivitiesComponent {
  postList: Campaign[] = [];

  modalRef: MdbModalRef<PostViewDialogComponent> | null = null;

  constructor(private modalService: MdbModalService) {}

  ngOnInit(): void {
    this.fetchLaundryList();
  }

  fetchLaundryList(): void {}

  openModal(post: Campaign) {
    this.modalRef = this.modalService.open(PostViewDialogComponent, {
      data: {
        post: post,
      },
    });
  }
}
