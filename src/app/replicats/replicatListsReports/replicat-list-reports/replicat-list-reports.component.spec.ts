import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplicatListReportsComponent } from './replicat-list-reports.component';

describe('ReplicatListReportsComponent', () => {
  let component: ReplicatListReportsComponent;
  let fixture: ComponentFixture<ReplicatListReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplicatListReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplicatListReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
