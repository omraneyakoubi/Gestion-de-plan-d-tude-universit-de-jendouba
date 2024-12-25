import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatediplomeComponent } from './updatediplome.component';

describe('UpdatediplomeComponent', () => {
  let component: UpdatediplomeComponent;
  let fixture: ComponentFixture<UpdatediplomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatediplomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatediplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
