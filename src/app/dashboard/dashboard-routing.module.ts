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
import { RoleGuard } from '../guards/role.guard'; // Import the RoleGuard

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'agent', // Agent-specific routes
        children: [
          { path: '', component: AgentHomeComponent, canActivate: [RoleGuard], data: { role: false } }, // Dashboard for Agent
          { path: 'requests', component: AgentRequestsComponent, canActivate: [RoleGuard], data: { role: false } }, // Manage Requests for Agent
          { path: 'activities', component: AgentActivitiesComponent, canActivate: [RoleGuard], data: { role: false } }, // Activities for Agent
        ]
      },
      {
        path: 'owner', // Owner-specific routes
        children: [
          { path: '', component: OwnerHomeComponent, canActivate: [RoleGuard], data: { role: true } }, // Dashboard for Owner
          { path: 'share-post', component: OwnerSharePostComponent, canActivate: [RoleGuard], data: { role: true } }, // Share a post for Owner
          { path: 'activities', component: OwnerActivitiesComponent, canActivate: [RoleGuard], data: { role: true } }, // Activities for Owner
        ]
      },
      { path: 'navbar', component: NavbarComponent } // Navbar can be accessed by both roles
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
