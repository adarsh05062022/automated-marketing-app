import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewDialogComponent } from './post-view-dialog.component';

describe('PostViewDialogComponent', () => {
  let component: PostViewDialogComponent;
  let fixture: ComponentFixture<PostViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostViewDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
