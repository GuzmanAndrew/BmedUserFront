import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePatologiasComponent } from './table-patologias.component';

describe('TablePatologiasComponent', () => {
  let component: TablePatologiasComponent;
  let fixture: ComponentFixture<TablePatologiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePatologiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePatologiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
