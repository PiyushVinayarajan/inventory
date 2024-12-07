import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRManagmentComponent } from './hrmanagment.component';

describe('HRManagmentComponent', () => {
  let component: HRManagmentComponent;
  let fixture: ComponentFixture<HRManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HRManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HRManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
