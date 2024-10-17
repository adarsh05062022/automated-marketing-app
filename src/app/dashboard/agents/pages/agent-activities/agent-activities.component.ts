import { ChangeDetectorRef, Component } from '@angular/core';
import { Campaign } from '../../../../interfaces/Post.interface';
import { PostViewDialogComponent } from '../../../shared/post-view-dialog/post-view-dialog.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CampaignService } from '../../../../services/campaign.service';

@Component({
  selector: 'app-agent-activities',
  templateUrl: './agent-activities.component.html',
  styleUrl: './agent-activities.component.css',
})
export class AgentActivitiesComponent {
  campaignList: Campaign[] = [];
  activeCampaigns: Campaign[] = [];
  expiredCampaigns: Campaign[] = [];
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
    this.campaignService.getCampaignsByAgentId().subscribe({
      next: (campaigns: any) => {
        this.campaignList = campaigns.campaigns.filter(
          (campaign: any) => campaign.isAccepted === true
        );
        console.log(this.campaignList);

        
        this.splitAndSortCampaigns(); // Split and sort campaigns
        this.cdRef.detectChanges(); // Trigger change detection manually
      },
      error: (err) => {
        console.error('Error fetching campaigns:', err);
      },
    });
  }

  splitAndSortCampaigns(): void {
    const currentDate = new Date();
    
    // Split campaigns into active and expired based on the current date
    this.activeCampaigns = this.campaignList.filter(
      (campaign) => new Date(campaign.endDate) >= currentDate
    );
    this.expiredCampaigns = this.campaignList.filter(
      (campaign) => new Date(campaign.endDate) < currentDate
    );

    // Sort by start date (most recent at the top)
    this.activeCampaigns.sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
    this.expiredCampaigns.sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  }

  openModal(post: Campaign) {
    this.modalRef = this.modalService.open(PostViewDialogComponent, {
      data: {
        post: post,
      },
    });
  }

  formatDate(newDate: Date): string {
    const date = new Date(newDate);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
    return `${day}-${month}-${year}`;
  }

  getStatus(startDate: Date, endDate: Date): string {
    const currentDate = new Date();
    if (new Date(startDate) <= currentDate && new Date(endDate) >= currentDate) {
      return 'Active';
    }
    return 'Expired';
  }
}
