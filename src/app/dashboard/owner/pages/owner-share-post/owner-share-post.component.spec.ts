import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSharePostComponent } from './owner-share-post.component';

describe('OwnerSharePostComponent', () => {
  let component: OwnerSharePostComponent;
  let fixture: ComponentFixture<OwnerSharePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerSharePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerSharePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
