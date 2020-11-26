import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorInfoComponent } from './simulator-info.component';

describe('SimulatorInfoComponent', () => {
  let component: SimulatorInfoComponent;
  let fixture: ComponentFixture<SimulatorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
