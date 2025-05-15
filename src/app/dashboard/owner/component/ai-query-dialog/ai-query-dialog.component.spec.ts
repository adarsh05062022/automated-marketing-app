import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiQueryDialogComponent } from './ai-query-dialog.component';

describe('AiQueryDialogComponent', () => {
  let component: AiQueryDialogComponent;
  let fixture: ComponentFixture<AiQueryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiQueryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiQueryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
