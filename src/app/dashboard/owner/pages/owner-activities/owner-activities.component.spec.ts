import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerActivitiesComponent } from './owner-activities.component';

describe('OwnerActivitiesComponent', () => {
  let component: OwnerActivitiesComponent;
  let fixture: ComponentFixture<OwnerActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerActivitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
