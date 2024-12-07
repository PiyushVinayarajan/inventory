import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsManagmentComponent } from './logistics-managment.component';

describe('LogisticsManagmentComponent', () => {
  let component: LogisticsManagmentComponent;
  let fixture: ComponentFixture<LogisticsManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticsManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
