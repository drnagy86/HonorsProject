import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricFacetsComponent } from './rubric-facets.component';

describe('RubricFacetsComponent', () => {
  let component: RubricFacetsComponent;
  let fixture: ComponentFixture<RubricFacetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricFacetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricFacetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
