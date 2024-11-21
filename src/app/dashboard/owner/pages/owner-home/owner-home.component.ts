import { Component } from '@angular/core';
import { ChartOptions, ChartData } from 'chart.js'; // Import ChartData for proper typing
import { ToastrService } from 'ngx-toastr';
import { Campaign } from '../../../../interfaces/Post.interface';
import { CampaignService } from '../../../../services/campaign.service';

@Component({
  selector: 'app-owner-home',
  templateUrl: './owner-home.component.html',
  styleUrl: './owner-home.component.css',
})
export class OwnerHomeComponent {
  totalExpense: number = 0;
  activeCampaigns: number = 0;
  uniqueAgents: number = 0;

  campaignList: any[] = [];

  // Revenue chart options and data
  public revenueChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };

  // Define the type for the data structure
  public revenueChartData: ChartData<'bar'>['datasets'] = [
    { data: [], label: 'Likes' },      // Placeholder for likes
    { data: [], label: 'Comments' },   // Placeholder for comments
  ];

  public revenueChartLabels: string[] = []; // This will hold the campaign names
  public chartLegend = true;

  constructor(
    private toastr: ToastrService,
    private campaignService: CampaignService // Inject the service
  ) {}

  ngOnInit(): void {
    this.fetchAgentDashboardData();
  }

  fetchAgentDashboardData() {
    this.fetchCampaignList();
  }

  fetchCampaignList(): void {
    this.campaignService.getCampaignsByOwnerId().subscribe({
      next: (campaigns: any) => {
        this.campaignList = campaigns.campaigns;

        console.log(this.campaignList);

        // Update dashboard variables
        this.calculateDashboardData();

        // Populate chart data after fetching campaigns
        this.updateChartData();
      },
      error: (err) => {
        console.error('Error fetching campaigns:', err);
      },
    });
  }

  calculateDashboardData(): void {
    // Total Expense: Sum of all campaign budgets
    this.totalExpense = this.campaignList.reduce(
      (acc, campaign) => acc + campaign.budget,
      0
    );

    // Active Campaigns: Campaigns where endDate is in the future
    const today = new Date();
    this.activeCampaigns = this.campaignList.filter(
      (campaign) => new Date(campaign.endDate) > today
    ).length;

    // Unique Agents: Count of unique userIds across all campaigns
    const uniqueAgentIds = new Set(
      this.campaignList.flatMap((campaign) =>
        campaign.agents.map((agent: { userId: { _id: any; }; }) => agent.userId._id)
      )
    );
    this.uniqueAgents = uniqueAgentIds.size;
  }

  // Update the chart with Campaign name vs Likes and Comments
  updateChartData(): void {
         
    const campaignList = this.campaignList.slice(-4); 


    // Reset the chart labels and data
    this.revenueChartLabels = [];
    const likesData: number[] = [];
    const commentsData: number[] = [];

    // Iterate through the campaigns and collect names, likes, and comments
    campaignList.forEach((campaign) => {
      this.revenueChartLabels.push(campaign.campaignName); // Add campaign name to labels
      const totalLikes = campaign.agents.reduce(
        (acc: any, agent: { metrics: { likes: any; }; }) => acc + agent.metrics.likes,
        0
      );
      const totalComments = campaign.agents.reduce(
        (acc: any, agent: { metrics: { comments: any; }; }) => acc + agent.metrics.comments,
        0
      );
      likesData.push(totalLikes); // Add total likes for each campaign
      commentsData.push(totalComments); // Add total comments for each campaign
    });

    // Update the chart datasets
    this.revenueChartData[0].data = likesData; // Update likes data
    this.revenueChartData[1].data = commentsData; // Update comments data
  }
}
