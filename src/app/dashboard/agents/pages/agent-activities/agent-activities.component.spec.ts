import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentActivitiesComponent } from './agent-activities.component';

describe('AgentActivitiesComponent', () => {
  let component: AgentActivitiesComponent;
  let fixture: ComponentFixture<AgentActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentActivitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
