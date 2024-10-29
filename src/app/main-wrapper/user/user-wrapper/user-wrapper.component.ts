import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/authentication/user.service';
import { LocalStorageService } from '../../../core/services/utils/local-storage.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import {
  EditProfileImageDialogComponent
} from '../components/dialogs/edit-profile-image-dialog/edit-profile-image-dialog.component';

@Component({
  selector: 'app-user-wrapper',
  templateUrl: './user-wrapper.component.html',
  styleUrl: './user-wrapper.component.scss'
})
export class UserWrapperComponent implements OnInit {
  profileImage!: SafeUrl;
  name = '';

  constructor(
    private localStorageService: LocalStorageService,
    private domSanitizer: DomSanitizer,
    private userService: UserService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.getImageProfileImage();
    this.getFirstAndLastName();
  }

  protected getImageProfileImage() {
    this.userService.getProfileImage(
      this.localStorageService.get('userId')
    ).subscribe(image => {
      const objectURL = URL.createObjectURL(image);
      this.profileImage = this.domSanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  protected getFirstAndLastName() {
    this.userService.getFirstAndLastName(
      this.localStorageService.get('userId')
    ).subscribe(response => {
      this.name = `${response.firstName} ${response.lastName}`;
    });
  }

  protected openEditModal() {
    const dialogRef = this.dialog.open(EditProfileImageDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getImageProfileImage();
    });
  }
}
