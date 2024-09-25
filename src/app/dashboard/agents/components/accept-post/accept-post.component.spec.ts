import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptPostComponent } from './accept-post.component';

describe('AcceptPostComponent', () => {
  let component: AcceptPostComponent;
  let fixture: ComponentFixture<AcceptPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
