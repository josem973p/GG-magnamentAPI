import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplicatStatusComponent } from './replicat-status.component';

describe('ReplicatStatusComponent', () => {
  let component: ReplicatStatusComponent;
  let fixture: ComponentFixture<ReplicatStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplicatStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplicatStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
