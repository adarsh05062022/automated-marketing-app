import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { Campaign } from '../../../interfaces/Post.interface';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AuthService } from '../../../services/authentication.service';

@Component({
  selector: 'app-post-view-dialog',
  templateUrl: './post-view-dialog.component.html',
  styleUrls: ['./post-view-dialog.component.css']
})
export class PostViewDialogComponent {
  post!: Campaign; // Property to hold the campaign information
  formattedStartDate: string = ''; // New property for formatted start date
  formattedEndDate: string = ''; // New property for formatted end date
  OwnerName:string = "";
  OwnerEmail:string = "";


  isOwner:boolean = false;

  constructor(public modalRef: MdbModalRef<PostViewDialogComponent>, private cdr: ChangeDetectorRef,private authService:AuthService) {}

  ngOnInit() {
    // Format the startDate and endDate to 'YYYY-MM-DD' string format for display
    if (this.post.startDate) {
      this.formattedStartDate = this.formatDate(new Date(this.post.startDate));
    }
    if (this.post.endDate) {
      this.formattedEndDate = this.formatDate(new Date(this.post.endDate));
    }

    // Manually trigger change detection to prevent ExpressionChangedAfterItHasBeenCheckedError
    this.cdr.detectChanges();


    this.isOwner = this.authService.getUser().isOwner;
  }


  setOwnerDetails(){
    this.OwnerName = this.post.owner.username || " ";
    this.OwnerEmail = this.post.owner.email || " ";
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
}
