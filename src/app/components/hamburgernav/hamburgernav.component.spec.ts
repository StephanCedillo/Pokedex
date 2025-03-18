import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgernavComponent } from './hamburgernav.component';

describe('HamburgernavComponent', () => {
  let component: HamburgernavComponent;
  let fixture: ComponentFixture<HamburgernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburgernavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HamburgernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
