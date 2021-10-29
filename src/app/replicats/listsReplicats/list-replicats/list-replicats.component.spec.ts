import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReplicatsComponent } from './list-replicats.component';

describe('ListReplicatsComponent', () => {
  let component: ListReplicatsComponent;
  let fixture: ComponentFixture<ListReplicatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReplicatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReplicatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
