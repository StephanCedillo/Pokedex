import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoPokemonComponent } from './photo-pokemon.component';

describe('PhotoPokemonComponent', () => {
  let component: PhotoPokemonComponent;
  let fixture: ComponentFixture<PhotoPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoPokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
