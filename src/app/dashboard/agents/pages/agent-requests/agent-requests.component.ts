import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { PostViewDialogComponent } from '../../../shared/post-view-dialog/post-view-dialog.component';
import { AcceptOrDenyComponent } from '../../../shared/accept-or-deny/accept-or-deny.component';
import { AcceptPostComponent } from '../../components/accept-post/accept-post.component';
import { Campaign } from '../../../../interfaces/Post.interface';
import { CampaignService } from '../../../../services/campaign.service';

@Component({
  selector: 'app-agent-requests',
  templateUrl: './agent-requests.component.html',
  styleUrl: './agent-requests.component.css',
})
export class AgentRequestsComponent {
  campaignList: Campaign[] = []; // Changed from postList to campaignList

  detailModalRef: MdbModalRef<PostViewDialogComponent> | null = null;
  acceptModalRef: MdbModalRef<AcceptPostComponent> | null = null;
  rejectModalRef: MdbModalRef<AcceptOrDenyComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private campaignService: CampaignService, // Inject your service
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchCampaigns();
  }

  fetchCampaigns(): void {
    this.campaignService.getCampaignsByAgentId().subscribe(
      (response) => {
        if (response && response.campaigns) {
          this.campaignList = response.campaigns;
          console.log(this.campaignList);
        } else {
          this.toastr.warning(response.message || 'No campaigns found.');
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error('Failed to retrieve campaigns: ' + error.message);
      }
    );
  }

  viewDetails(campaign: Campaign) {
    this.detailModalRef = this.modalService.open(PostViewDialogComponent, {
      data: {
        post: campaign,
      },
    });
  }

  onAcceptCampaign(campaign: Campaign) {
    this.rejectModalRef = this.modalService.open(AcceptOrDenyComponent, {
      data: {
        message:
          'Are you sure you want to transmit this campaign on your social?', // Customize the message here
      },
    });

    this.rejectModalRef.onClose.subscribe((result: boolean) => {
      if (result) {
        this.toastr.success('Campaign Sharing successfully.');
      } else {
        this.toastr.info('Campaign Sharing cancelled.');
      }
    });
  }

  onRejectCampaign(campaign: Campaign) {
    this.rejectModalRef = this.modalService.open(AcceptOrDenyComponent, {
      data: {
        message: 'Are you sure you want to reject this campaign?',
      },
    });

    this.rejectModalRef.onClose.subscribe((result: boolean) => {
      if (result) {
        this.campaignService.removeAgentFromCampaign(campaign._id).subscribe(
          (response) => {
            this.toastr.success(
              'Campaign rejected and agent removed successfully.'
            );
            this.fetchCampaigns();
          },
          (error) => {
            console.error('Error removing agent from campaign:', error);
            this.toastr.error('Failed to reject campaign and remove agent.');
          }
        );
      } else {
        this.toastr.info('Campaign rejection cancelled.');
      }
    });
  }

  // Add any additional methods or logic as needed
}
