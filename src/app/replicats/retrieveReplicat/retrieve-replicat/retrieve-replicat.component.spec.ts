import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveReplicatComponent } from './retrieve-replicat.component';

describe('RetrieveReplicatComponent', () => {
  let component: RetrieveReplicatComponent;
  let fixture: ComponentFixture<RetrieveReplicatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrieveReplicatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrieveReplicatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
