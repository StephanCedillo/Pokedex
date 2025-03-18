import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchingPokemonComponent } from './catching-pokemon.component';

describe('CatchingPokemonComponent', () => {
  let component: CatchingPokemonComponent;
  let fixture: ComponentFixture<CatchingPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatchingPokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatchingPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
