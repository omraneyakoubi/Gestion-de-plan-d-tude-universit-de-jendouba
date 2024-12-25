import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalanderierComponent } from './calanderier.component';

describe('CalanderierComponent', () => {
  let component: CalanderierComponent;
  let fixture: ComponentFixture<CalanderierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalanderierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalanderierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
