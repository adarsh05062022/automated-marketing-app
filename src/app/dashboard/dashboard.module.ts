import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { OwnerHomeComponent } from './owner/pages/owner-home/owner-home.component';
import { AgentHomeComponent } from './agents/pages/agent-home/agent-home.component';
import { MainComponent } from './layout/main/main.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AgentActivitiesComponent } from './agents/pages/agent-activities/agent-activities.component';
import { AgentRequestsComponent } from './agents/pages/agent-requests/agent-requests.component';
import { OwnerSharePostComponent } from './owner/pages/owner-share-post/owner-share-post.component';
import { OwnerActivitiesComponent } from './owner/pages/owner-activities/owner-activities.component';
import { PostViewDialogComponent } from './shared/post-view-dialog/post-view-dialog.component';
import { AcceptOrDenyComponent } from './shared/accept-or-deny/accept-or-deny.component';
import { AcceptPostComponent } from './agents/components/accept-post/accept-post.component';


@NgModule({
  declarations: [
    OwnerHomeComponent,
    AgentHomeComponent,
    MainComponent,
    SidebarComponent,
    NavbarComponent,
    
    AgentActivitiesComponent,
    AgentRequestsComponent,
    OwnerSharePostComponent,
    OwnerActivitiesComponent,
    PostViewDialogComponent,
    AcceptOrDenyComponent,
    AcceptPostComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
