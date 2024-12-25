import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcalComponent } from './addcal.component';

describe('AddcalComponent', () => {
  let component: AddcalComponent;
  let fixture: ComponentFixture<AddcalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
