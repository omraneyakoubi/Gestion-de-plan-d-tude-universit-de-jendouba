import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireComponent } from './gestionnaire.component';

describe('GestionnaireComponent', () => {
  let component: GestionnaireComponent;
  let fixture: ComponentFixture<GestionnaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionnaireComponent]
    });
    fixture = TestBed.createComponent(GestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
