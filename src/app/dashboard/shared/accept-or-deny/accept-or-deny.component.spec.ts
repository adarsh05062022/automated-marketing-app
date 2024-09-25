import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptOrDenyComponent } from './accept-or-deny.component';

describe('AcceptOrDenyComponent', () => {
  let component: AcceptOrDenyComponent;
  let fixture: ComponentFixture<AcceptOrDenyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptOrDenyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptOrDenyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
