import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecallComponent } from './updatecall.component';

describe('UpdatecallComponent', () => {
  let component: UpdatecallComponent;
  let fixture: ComponentFixture<UpdatecallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
