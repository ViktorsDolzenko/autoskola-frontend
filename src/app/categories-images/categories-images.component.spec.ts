import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesImagesComponent } from './categories-images.component';

describe('CategoriesImagesComponent', () => {
  let component: CategoriesImagesComponent;
  let fixture: ComponentFixture<CategoriesImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
