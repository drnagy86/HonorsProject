import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricDetailsComponent } from './rubric-details.component';

describe('RubricDetailsComponent', () => {
  let component: RubricDetailsComponent;
  let fixture: ComponentFixture<RubricDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
