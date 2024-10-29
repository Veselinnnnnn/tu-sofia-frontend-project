import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animal-shelter',
  templateUrl: './animal-shelter.component.html',
  styleUrl: './animal-shelter.component.scss'
})
export class AnimalShelterComponent implements OnInit {
  // @Input() animal: CommentResponseModel[] = [];

  constructor() {
  }

  ngOnInit() {
    // this.reservationsService.getAll(1).subscribe((response) => {
    //   console.log("Reservations", response)
    // })
  }
}
