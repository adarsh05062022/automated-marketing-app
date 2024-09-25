import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AgentHomeComponent } from './agents/pages/agent-home/agent-home.component';
import { OwnerHomeComponent } from './owner/pages/owner-home/owner-home.component';
import { AgentActivitiesComponent } from './agents/pages/agent-activities/agent-activities.component';
import { AgentRequestsComponent } from './agents/pages/agent-requests/agent-requests.component';
import { OwnerActivitiesComponent } from './owner/pages/owner-activities/owner-activities.component';
import { OwnerSharePostComponent } from './owner/pages/owner-share-post/owner-share-post.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'agent', // Agent-specific routes
        children: [
          { path: '', component: AgentHomeComponent }, // Dashboard for Agent
          { path: 'requests', component: AgentRequestsComponent }, // Manage Requests for Agent
          { path: 'activities', component: AgentActivitiesComponent }, // Activities for Agent
        ]
      },
      {
        path: 'owner', // Owner-specific routes
        children: [
          { path: '', component: OwnerHomeComponent }, // Dashboard for Owner
          { path: 'share-post', component: OwnerSharePostComponent }, // Share a thread for Owner
          { path: 'activities', component: OwnerActivitiesComponent }, // Activities for Owner
        ]
      },
      { path: 'navbar', component: NavbarComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
