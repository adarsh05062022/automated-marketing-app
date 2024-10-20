import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { SocialService } from '../../../../services/social.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from '../../../../services/campaign.service';

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

  socialMedia = {
    instagram: {
      username: '',
      password: '',
    },
  };

  // Revenue chart options and data
  public revenueChartOptions: ChartOptions<'bar'> = { responsive: true };
  public revenueChartLabels!: string[];
  public revenueChartData = [{ data: [], label: 'Revenue (in $)' }];
  public chartLegend = true;

  constructor(
    private socialService: SocialService,
    private campaignService: CampaignService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchAgentDashboardData();
    this.fetchSocialAccountDetails();
  }

  async fetchAgentDashboardData() {
    this.campaignService.getCampaignsByAgentId().subscribe(
      (response) => {
        if (response && response.campaigns) {
          let campaignList = response.campaigns;

          campaignList = response.campaigns.filter(
            (campaign: any) => campaign.isAccepted === true
          );


          console.log(campaignList)

          this.totalRevenue = campaignList.reduce(
            (acc: any, campaign: { metrics: { earnings: any; }; }) => acc + (campaign.metrics ? campaign.metrics.earnings : 0),
            0
          );

          this.approvedPosts = campaignList.filter(
            (campaign: { isAccepted: any; }) => campaign.isAccepted
          ).length;

          this.activeCampaigns = campaignList.filter(
            (campaign: { endDate: string | number | Date; }) => new Date(campaign.endDate) > new Date()
          ).length;

          campaignList = campaignList.slice(-6); 

          // Set data for chart
          this.revenueChartData[0].data = campaignList.map(
            (campaign: { metrics: { earnings: any; }; }) => (campaign.metrics ? campaign.metrics.earnings : 0)
          );
          this.revenueChartLabels = campaignList.map(
            (campaign: { campaignName: any; }) => campaign.campaignName
          );
        }
      },
      (error) => {
        console.error('Failed to retrieve campaigns:', error);
        this.toastr.error('Failed to retrieve campaigns.');
      }
    );
  }

  fetchSocialAccountDetails() {
    this.socialService
      .getSocialAccount()
      .pipe(
        catchError((error) => {
          console.error('Error fetching Instagram account:', error);
          this.toastr.error('Failed to load Instagram account.');
          return of(null);
        })
      )
      .subscribe((account) => {
        if (account) {
          this.socialMedia.instagram.username = account.username;
          this.socialMedia.instagram.password = account.password;
        }
      });
  }

  onEditIconClick() {
    this.isInstagramEditing = !this.isInstagramEditing;
  }

  onSaveIconClick() {
    const { username, password } = this.socialMedia.instagram;

    this.socialService
      .registerOrUpdateSocialAccount(username, password)
      .pipe(
        catchError((error) => {
          console.error('Error saving Instagram account:', error);
          this.toastr.error('Failed to save Instagram account.');
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.toastr.success('Instagram account saved successfully!');
        }
      });

    this.isInstagramEditing = false;
  }
}
