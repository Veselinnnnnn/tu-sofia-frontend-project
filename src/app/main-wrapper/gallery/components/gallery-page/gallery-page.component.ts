import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnimalService } from '../../../../core/services/animal/animal.service';
import { AnimalResponseModel } from '../../../../core/model/animal/AnimalResponse.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.scss'
})
export class GalleryPageComponent implements OnInit {
  protected totalElements: number = 0;
  protected pageSize: number = 5;
  protected page: number = 1;
  protected animals: AnimalResponseModel[] = [];

  constructor(
    private animalService: AnimalService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  protected getData(): void {
    this.animalService.getAllAnimalsPaginated(this.page - 1, this.pageSize).subscribe((response) => {
      this.animals = response.content;
      this.totalElements = response.totalElements;
      this.animals.map((animal: AnimalResponseModel) => {
        animal.img = `data:image/png;base64,${animal.img}`;
      });
      this.cdr.detectChanges();
    })
  }

  protected navigateToAnimalDetails(animal: AnimalResponseModel): void {
    this.router.navigate(['available-animals/animal', animal.id]);
  }

  protected onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();
  }
}
