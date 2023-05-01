import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCovidComponent } from './table-covid.component';

describe('TableCovidComponent', () => {
  let component: TableCovidComponent;
  let fixture: ComponentFixture<TableCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCovidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
