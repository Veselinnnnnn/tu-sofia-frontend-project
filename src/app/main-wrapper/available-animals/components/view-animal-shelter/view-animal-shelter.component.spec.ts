import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnimalShelterComponent } from './view-animal-shelter.component';

describe('HistoryComponent', () => {
  let component: ViewAnimalShelterComponent;
  let fixture: ComponentFixture<ViewAnimalShelterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAnimalShelterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAnimalShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
