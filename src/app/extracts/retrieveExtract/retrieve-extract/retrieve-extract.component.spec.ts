import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveExtractComponent } from './retrieve-extract.component';

describe('RetrieveExtractComponent', () => {
  let component: RetrieveExtractComponent;
  let fixture: ComponentFixture<RetrieveExtractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrieveExtractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrieveExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
