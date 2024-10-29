import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'bop-styled-toast',
  templateUrl: './styled-toast.component.html',
  styleUrls: ['./styled-toast.component.scss']
})
export class StyledToastComponent implements OnInit {
  icon: string = '';

  message: string = '';

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    if (this.data) {
      this.icon = this.data.icon || '';
      this.message = this.data.message || '';
    }
  }
}
