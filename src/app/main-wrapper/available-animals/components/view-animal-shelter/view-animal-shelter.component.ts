import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AnimalService } from '../../../../core/services/animal/animal.service';
import { AnimalResponseModel } from '../../../../core/model/animal/AnimalResponse.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LocalStorageService } from '../../../../core/services/utils/local-storage.service';
import { UserService } from '../../../../core/services/authentication/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateAnimalComponent } from '../dialogs/create-animal/create-animal.component';

@Component({
  selector: 'app-animal-shelter',
  templateUrl: './view-animal-shelter.component.html',
  styleUrl: './view-animal-shelter.component.scss'
})
export class ViewAnimalShelterComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;

  protected isAdmin: boolean = false;
  protected animals: AnimalResponseModel[] = [];
  protected page = 1;
  protected pageSize = 5;
  protected totalElements = 0;

  constructor(
    private animalService: AnimalService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.paginatedAnimals();
    this.getUserRole();
  }

  openAddAnimalModal() {
    const dialogRef = this.dialog.open(CreateAnimalComponent, {
      width: '400px', // Set the width as needed
    });

    dialogRef.afterClosed().subscribe(() => {
      this.paginatedAnimals();
    });
  }

  protected onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.paginatedAnimals();
  }

  protected paginatedAnimals() {
    this.animalService.getAllAvailable(this.page - 1, this.pageSize).subscribe((response) => {
      this.animals = response.content;
      this.totalElements = response.totalElements;
      this.animals.map((animal: AnimalResponseModel) => {
        animal.img = `data:image/png;base64,${animal.img}`;
      });
      this.cdr.detectChanges();
    });
  }

  private getUserRole() {
    this.userService.getBasicInfo(
      Number(this.localStorageService.get('userId'))
    ).subscribe((response) => {
      this.isAdmin = response.role === 'ADMIN';
    });
  }
}
