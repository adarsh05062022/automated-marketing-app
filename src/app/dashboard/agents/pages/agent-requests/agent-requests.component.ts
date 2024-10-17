import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { Campaign } from "../../../../interfaces/Post.interface";
import { CampaignService } from "../../../../services/campaign.service";
import { AcceptOrDenyComponent } from "../../../shared/accept-or-deny/accept-or-deny.component";
import { PostViewDialogComponent } from "../../../shared/post-view-dialog/post-view-dialog.component";
import { AcceptPostComponent } from "../../components/accept-post/accept-post.component";

@Component({
  selector: 'app-agent-requests',
  templateUrl: './agent-requests.component.html',
  styleUrls: ['./agent-requests.component.css'], // Corrected from styleUrl to styleUrls
})
export class AgentRequestsComponent {
  campaignList: Campaign[] = [];

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

  // Fetch campaigns assigned to the agent
  fetchCampaigns(): void {
    this.campaignService.getCampaignsByAgentId().subscribe(
      (response) => {
        if (response && response.campaigns) {
          this.campaignList = response.campaigns.filter(
            (campaign: any) => campaign.isAccepted === false
          );
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

  // Open a modal to view campaign details
  viewDetails(campaign: Campaign) {
    this.detailModalRef = this.modalService.open(PostViewDialogComponent, {
      data: {
        post: campaign,
      },
    });
  }

  // Accept campaign and open modal to confirm action
  onAcceptCampaign(campaign: Campaign) {
    this.rejectModalRef = this.modalService.open(AcceptOrDenyComponent, {
      data: {
        message: 'Are you sure you want to transmit this campaign on your social media?',
      },
    });

    this.rejectModalRef.onClose.subscribe((result: boolean) => {
      if (result) {
        // Mark campaign as accepted in the backend
        this.toastr.warning('Process Scheduled');
        this.campaignService.acceptCampaign(campaign._id).subscribe(
          (response) => {
            this.toastr.success('Campaign accepted and sharing confirmed.');
            this.fetchCampaigns(); // Refresh campaigns
          },
          (error) => {
            console.error('Error accepting campaign:', error);
            this.toastr.error('Failed to accept campaign.');
          }
        );
      } else {
        this.toastr.info('Campaign sharing cancelled.');
      }
    });
  }

  // Reject campaign with a modal confirmation
  onRejectCampaign(campaign: Campaign) {
    this.rejectModalRef = this.modalService.open(AcceptOrDenyComponent, {
      data: {
        message: 'Are you sure you want to reject this campaign?',
      },
    });

    this.rejectModalRef.onClose.subscribe((result: boolean) => {
      if (result) {
        // Remove the agent from the campaign
        this.campaignService.removeAgentFromCampaign(campaign._id).subscribe(
          (response) => {
            this.toastr.success('Campaign rejected and agent removed successfully.');
            this.fetchCampaigns(); // Refresh campaigns after rejection
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
}
