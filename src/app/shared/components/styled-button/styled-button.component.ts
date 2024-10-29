import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-styled-button',
  templateUrl: './styled-button.component.html',
  styleUrl: './styled-button.component.scss'
})
export class StyledButtonComponent implements OnInit {
  @Input()
  public btnContent: string = '';

  @Input()
  public disabled: boolean = false;

  @Input()
  public btnIcon: string = '';

  @Input()
  public btnStyle: string = '';

  ngOnInit() {
  }
}
