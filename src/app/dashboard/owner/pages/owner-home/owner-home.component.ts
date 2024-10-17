import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { Campaign } from '../../../../interfaces/Post.interface';
import { CampaignService } from '../../../../services/campaign.service';

@Component({
  selector: 'app-owner-home',
  templateUrl: './owner-home.component.html',
  styleUrl: './owner-home.component.css'
})
export class OwnerHomeComponent {
  totalExpense: number = 0;
  activeCampaigns: number = 0;
  uniqueAgents: number = 0;

  campaignList: Campaign[] = [];

  // Revenue chart options and data
  public revenueChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
  public revenueChartLabels = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  public revenueChartData = [
    {
      data: [120, 150, 180, 90, 200, 250, 300],
      label: 'Revenue (in $)',
    },
  ];
  public chartLegend = true;

  constructor(
    private toastr: ToastrService,
    private campaignService: CampaignService, // Inject the service
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
        
        // Update dashboard variables
        this.calculateDashboardData();

        console.log(this.campaignList);
      },
      error: (err) => {
        console.error('Error fetching campaigns:', err);
      },
    });
  }

  calculateDashboardData(): void {
    // Total Expense: Sum of all campaign budgets
    this.totalExpense = this.campaignList.reduce((acc, campaign) => acc + campaign.budget, 0);



    // Active Campaigns: Campaigns where endDate is in the future
    const today = new Date();
    this.activeCampaigns = this.campaignList.filter(campaign => new Date(campaign.endDate) > today).length;

    // Unique Agents: Count of unique userIds across all campaigns
    const uniqueAgentIds = new Set(
      this.campaignList.flatMap(campaign => campaign.agents.map(agent => agent.userId._id))
    );
    this.uniqueAgents = uniqueAgentIds.size;
  }
}
