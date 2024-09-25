import { Component } from '@angular/core';
import { Post } from '../../../../interfaces/Post.interface';
import { PostViewDialogComponent } from '../../../shared/post-view-dialog/post-view-dialog.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-agent-activities',
  templateUrl: './agent-activities.component.html',
  styleUrl: './agent-activities.component.css',
})
export class AgentActivitiesComponent {
  postList: Post[] = [
    { custName: 'John Doe', status: 'Pending', amount: '500' },
    { custName: 'Jane Smith', status: 'Completed', amount: '1200' },
    { custName: 'Alice Johnson', status: 'In Progress', amount: '750' },
    { custName: 'Bob Brown', status: 'Pending', amount: '300' },
    { custName: 'Charlie Davis', status: 'Completed', amount: '950' },
  ];

  modalRef: MdbModalRef<PostViewDialogComponent> | null = null;

  constructor(private modalService: MdbModalService) {}

  ngOnInit(): void {
    this.fetchLaundryList();
  }

  fetchLaundryList(): void {}

  openModal(post: Post) {
    this.modalRef = this.modalService.open(PostViewDialogComponent, {
      data: {
        post: post,
      },
    });
  }
}
