import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdategroupeComponent } from './updategroupe.component';

describe('UpdategroupeComponent', () => {
  let component: UpdategroupeComponent;
  let fixture: ComponentFixture<UpdategroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdategroupeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdategroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
