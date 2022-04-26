import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Facet2Component } from './facet2.component';

describe('Facet2Component', () => {
  let component: Facet2Component;
  let fixture: ComponentFixture<Facet2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Facet2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Facet2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
