import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/authentication/user.service';
import { UserResponseModel } from '../../../../core/model/user/UserResponse.model';
import { AnimalResponseModel } from '../../../../core/model/animal/AnimalResponse.model';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.scss'
})
export class AboutUsPageComponent implements OnInit{
  protected users: UserResponseModel[] = [];

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.userService.getTeamMembers().subscribe((response) => {
      this.users = response;

      this.users.map((user: UserResponseModel) => {
        user.img = `data:image/png;base64,${user.img}`;
      });
    })
  }
}
