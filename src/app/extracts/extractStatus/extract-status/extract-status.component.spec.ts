import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractStatusComponent } from './extract-status.component';

describe('ExtractStatusComponent', () => {
  let component: ExtractStatusComponent;
  let fixture: ComponentFixture<ExtractStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtractStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
