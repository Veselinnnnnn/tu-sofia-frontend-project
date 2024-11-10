import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../../../core/services/animal/animal.service';
import { AnimalResponseModel } from '../../../../core/model/animal/AnimalResponse.model';
import { CommentResponseModel } from '../../../../core/model/comment/CommentResponse.model';
import { LocalStorageService } from '../../../../core/services/utils/local-storage.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCommentDialogComponent } from '../add-comment-dialog/add-comment-dialog.component';
import { RequestWalkComponent } from '../request-walk/request-walk.component';
import { RequestAdoptionComponent } from '../request-adoption/request-adoption.component';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrl: './animal-details.component.scss'
})
export class AnimalDetailsComponent implements OnInit{
  protected animal: AnimalResponseModel = { img: '', comments: [] as CommentResponseModel[] } as AnimalResponseModel;
  starsArray: number[] = [0, 1, 2, 3, 4];

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private localStorageService: LocalStorageService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit() {
    const animalId = Number(this.route.snapshot.paramMap.get('id')!);

    this.getAnimal(animalId);
  }

  protected getAnimal(animalId: number) {
    this.animalService.getAnimal(
      animalId,
      Number(this.localStorageService.get('userId')),
    ).subscribe((response) => {
      this.animal = response
      this.animal.img = `data:image/png;base64,${this.animal.img}`
    })
  }

  getStarType(index: number): string {
    const fullStars = Math.floor(this.animal.rating);
    const decimalPart = (this.animal.rating % 1) * 100;

    if (index < fullStars) {
      return 'full';
    } else if (index === fullStars) {
      if (decimalPart >= 0 && decimalPart < 30) {
        return 'quarter';
      } else if (decimalPart >= 30 && decimalPart < 70) {
        return 'half';
      } else if (decimalPart >= 70 && decimalPart < 100) {
        return 'three-quarters';
      }
    }
    return 'empty';
  }

  protected onAddCommentButtonClicked() {
      const dialogRef = this.matDialog.open(AddCommentDialogComponent, {
        data: {
          animal: this.animal,
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      this.getAnimal(this.animal.id);
    });
  }

  protected onCommentChange(){
    this.getAnimal(this.animal.id);
  }

  protected adoptAnimal() {
    const dialogRef = this.matDialog.open(RequestAdoptionComponent, {
      width: '800px',
      height: '800px',
      data: {
        animalId: this.animal.id,
        animalName: this.animal.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  protected walkAnimal() {
    const dialogRef = this.matDialog.open(RequestWalkComponent, {
      width: '400px',
      data: {
        animalId: this.animal.id,
        animalName: this.animal.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
