export interface Agent {
  userId: {
    username:string;
    _id:string
  }; // Assuming userId is stored as a string
  affiliatedLink: string;
}

export interface Campaign {
  _id:string
  campaignName: string;
  budget: number;
  platform: string;
  description: string;
  startDate: Date;
  endDate: Date;
  image: string; // Base64 image string
  agents: Agent[]; // List of agents associated with the campaign
  owner: any; 
}