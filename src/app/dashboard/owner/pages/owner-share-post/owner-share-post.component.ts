import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CampaignService } from '../../../../services/campaign.service'; // Import CampaignService
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-owner-share-post',
  templateUrl: './owner-share-post.component.html',
  styleUrls: ['./owner-share-post.component.css'],
})
export class OwnerSharePostComponent {
  campaignForm!: FormGroup;
  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private campaignService: CampaignService, // Inject CampaignService
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.campaignForm = this.formBuilder.group({
      campaignName: ['', Validators.required],
      budget: ['', Validators.required],
      platform: ['', Validators.required],
      description: ['', Validators.required], // Added description field
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result; // Preview the image as a Data URL
      };

      reader.readAsDataURL(file); // Convert image to Data URL for preview
    } else {
      console.error('No file selected');
    }
  }

  createCampaign(): void {
    if (this.campaignForm.invalid || !this.selectedFile) {
      return;
    }

    // Convert the image file to Base64 string
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string; // Convert the image to a Base64 string

      const campaignData = {
        ...this.campaignForm.value,
        image: base64Image, // Include the Base64 string of the image
      };

      console.log(campaignData); // Log campaign data, including the image Base64 string

      // Call the service to create the campaign
      this.campaignService.createCampaign(campaignData).subscribe(
        (response: any) => {
          console.log('Campaign created successfully:', response);
          this.toastr.success('Campaign created successfully'); 
          this.router.navigate(['/dashboard/owner']); // Navigate to owner's dashboard on success
        },
        (error: any) => {
          console.error('Error creating campaign:', error); // Log error if any
        }
      );
    };

    reader.readAsDataURL(this.selectedFile); // Read the file as a Data URL to convert it to Base64
  }
}
