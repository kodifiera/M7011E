import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferSlidersComponent } from './buffer-sliders.component';

describe('BufferSlidersComponent', () => {
  let component: BufferSlidersComponent;
  let fixture: ComponentFixture<BufferSlidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BufferSlidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BufferSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
