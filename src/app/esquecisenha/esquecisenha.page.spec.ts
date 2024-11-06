import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsquecisenhaPage } from './esquecisenha.page';

describe('EsquecisenhaPage', () => {
  let component: EsquecisenhaPage;
  let fixture: ComponentFixture<EsquecisenhaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EsquecisenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
