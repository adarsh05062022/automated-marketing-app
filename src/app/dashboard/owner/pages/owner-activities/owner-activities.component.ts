import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Campaign } from '../../../../interfaces/Post.interface';
import { PostViewDialogComponent } from '../../../shared/post-view-dialog/post-view-dialog.component';
import { CampaignService } from '../../../../services/campaign.service'; // Import the service
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-owner-activities',
  templateUrl: './owner-activities.component.html',
  styleUrls: ['./owner-activities.component.css'],
})
export class OwnerActivitiesComponent implements OnInit {
  campaignList: Campaign[] = [];
  modalRef: MdbModalRef<PostViewDialogComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private campaignService: CampaignService, // Inject the service
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchCampaignList();
  }

  // Fetch campaigns by user ID
  fetchCampaignList(): void {
    this.campaignService.getCampaignsByOwnerId().subscribe({
      next: (campaigns: any) => {
        this.campaignList = campaigns.campaigns;
        this.cdRef.detectChanges(); // Trigger change detection manually
      },
      error: (err) => {
        console.error('Error fetching campaigns:', err);
      },
    });
  }

  openModal(post: Campaign) {
    this.modalRef = this.modalService.open(PostViewDialogComponent, {
      data: {
        post: post,
      },
    });
  }

  formatDate(newDate: Date): string {

    const date = new Date(newDate)

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
    return `${day}-${month}-${year}`;
  }
}
