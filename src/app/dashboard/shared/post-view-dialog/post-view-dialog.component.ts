  import { Component, Inject, ChangeDetectorRef } from '@angular/core';
  import { Campaign } from '../../../interfaces/Post.interface';
  import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
  import { AuthService } from '../../../services/authentication.service';
  import { CampaignService } from '../../../services/campaign.service'; // Import your CampaignService
  import { ToastrService } from 'ngx-toastr';

  @Component({
    selector: 'app-post-view-dialog',
    templateUrl: './post-view-dialog.component.html',
    styleUrls: ['./post-view-dialog.component.css'],
  })
  export class PostViewDialogComponent {
    post!: any; // Property to hold the campaign information
    formattedStartDate: string = ''; // New property for formatted start date
    formattedEndDate: string = ''; // New property for formatted end date
    OwnerName: string = '';
    OwnerEmail: string = '';
    isAccepted: boolean = false;
    FetchButtonText: string = "Fetch";

    metrics: {
      likes: number;
      comments: number;
      earnings: number;
    } = {
      likes: 0,
      comments: 0,
      earnings: 0,
    };

    isOwner: boolean = false;

    constructor(
      public modalRef: MdbModalRef<PostViewDialogComponent>,
      private cdr: ChangeDetectorRef,
      private authService: AuthService,
      private campaignService: CampaignService, // Inject your CampaignService
      private toastr:ToastrService
    ) {}

    ngOnInit() {
      // Format the startDate and endDate to 'YYYY-MM-DD' string format for display
      if (this.post.startDate) {
        this.formattedStartDate = this.formatDate(new Date(this.post.startDate));
      }
      if (this.post.endDate) {
        this.formattedEndDate = this.formatDate(new Date(this.post.endDate));
      }

      this.isAccepted = this.post.isAccepted;

      // Manually trigger change detection to prevent ExpressionChangedAfterItHasBeenCheckedError
      this.cdr.detectChanges();

      this.isOwner = this.authService.getUser().isOwner;

      // Set owner details
      this.setOwnerDetails();

      if(!this.isOwner){
        this.getMetrics();

      }

      
    }

    setOwnerDetails() {
      this.OwnerName = this.post.owner.username || ' ';
      this.OwnerEmail = this.post.owner.email || ' ';
    }

    // Function to format a Date object to 'YYYY-MM-DD'
    formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
      const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
      return `${year}-${month}-${day}`;
    }

    closeModal(): void {
      this.modalRef.close(); // Close the modal
    }

    fetchMetrics() {
      this.FetchButtonText = "Fetching...";
      
      // Call updateMetrics method from your CampaignService
      this.campaignService.updateMetrics(this.post._id).subscribe(
        (response) => {
          // Assuming response contains the updated metrics
          
          if (response ) {
            this.metrics.likes = response.likes; // Update the metrics with the fetched data
            this.metrics.comments = response.comments; // Update the metrics with the fetched data
            this.metrics.earnings = response.earnings*this.post.budget; // Update the metrics with the fetched data
            
          } else {
            console.warn(response.message || 'No metrics found.');
          }
        },
        (error) => {
          console.error('Failed to fetch metrics:', error);
          this.FetchButtonText = "Fetch"; // Reset button text on error
          // this.toastr.error('Failed to fetch metrics: ' + error.message);
        },
        () => {
          this.FetchButtonText = "Fetch"; // Reset button text after completion
        }
      );
    }
    
    // Add the getMetrics function
    private getMetrics() {
      this.campaignService.getMetrics(this.post._id).subscribe(
        (response) => {

          
          if (response ) {
            this.metrics.likes = response.likes; // Update the metrics with the fetched data
            this.metrics.comments = response.comments; // Update the metrics with the fetched data
            this.metrics.earnings = response.earnings*this.post.budget; // Update the metrics with the fetched data
            
          } else {
            console.warn(response.message || 'No metrics found.');
          }
        },
        (error) => {
          console.warn('Failed to get metrics:', error);
        }
      );
    }
  }
