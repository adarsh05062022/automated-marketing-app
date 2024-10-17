import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { SocialService } from '../../../../services/social.service'; // Adjust the path as necessary
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.scss'],
})
export class AgentHomeComponent implements OnInit {
  totalRevenue: number = 0;
  approvedPosts: number = 0;
  activeCampaigns: number = 0;

  isInstagramEditing: boolean = false;

  socialMedia: {
    instagram: {
      username: string;
      password: string;
    };
  } = {
    instagram: {
      username: '',
      password: '',
    },
  };

  // Revenue chart options and data
  public revenueChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
  public revenueChartLabels = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  public revenueChartData = [
    {
      data: [120, 150, 180, 90, 200, 250, 300],
      label: 'Revenue (in $)',
    },
  ];
  public chartLegend = true;

  constructor(
    private socialService: SocialService,
    private toastr: ToastrService
  ) {} // Inject the service

  ngOnInit(): void {
    // Fetch necessary data for dashboard and social account details
    this.fetchAgentDashboardData();
    this.fetchSocialAccountDetails();
  }

  fetchAgentDashboardData() {
    // Mock data, replace with API calls
    this.totalRevenue = 1250;
    this.approvedPosts = 12;
    this.activeCampaigns = 4;
  }

  fetchSocialAccountDetails() {
    // Call the service method to get Instagram account details
    this.socialService
      .getSocialAccount()
      .pipe(
        catchError((error) => {
          console.error('Error fetching Instagram account:', error);
          // this.toastr.error('Failed to load Instagram account.');
          return of(null);
        })
      )
      .subscribe((account) => {
        if (account) {
          this.socialMedia.instagram.username = account.username;
          this.socialMedia.instagram.password = account.password;
          // this.toastr.success('Instagram account loaded successfully!');
        }
      });
  }

  onEditIconClick() {
    this.isInstagramEditing = !this.isInstagramEditing;
  }

  onSaveIconClick() {
    const instagramData = {
      username: this.socialMedia.instagram.username,
      password: this.socialMedia.instagram.password,
    };

    // Call the service method to save Instagram account details
    this.socialService
      .registerOrUpdateSocialAccount(
        instagramData.username,
        instagramData.password
      )
      .pipe(
        catchError((error) => {
          console.error('Error saving Instagram account:', error);
          this.toastr.error('Failed to save Instagram account.'); // Show error toast
          return of(null); // Handle the error as needed
        })
      )
      .subscribe((response) => {
        if (response) {
          console.log('Instagram account saved successfully:', response);
          this.toastr.success('Instagram account saved successfully!'); // Show success toast
        } else {
          console.log('Failed to save Instagram account');
        }
      });

    this.isInstagramEditing = !this.isInstagramEditing; // Toggle editing state
  }
}
