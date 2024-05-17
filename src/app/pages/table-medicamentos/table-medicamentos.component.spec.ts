import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMedicamentosComponent } from './table-medicamentos.component';

describe('TableMedicamentosComponent', () => {
  let component: TableMedicamentosComponent;
  let fixture: ComponentFixture<TableMedicamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMedicamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
