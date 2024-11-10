import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../../core/services/authentication/user.service';
import { LocalStorageService } from '../../../../../core/services/utils/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StyledToastComponent } from '../../../../../shared/components/styled-toast/styled-toast.component';

@Component({
  selector: 'app-edit-profile-image-dialog',
  templateUrl: './edit-profile-image-dialog.component.html',
  styleUrl: './edit-profile-image-dialog.component.scss'
})
export class EditProfileImageDialogComponent {
  selectedImage: string | ArrayBuffer | null = null;
  selectedFile!: File;

  constructor(
    public dialogRef: MatDialogRef<EditProfileImageDialogComponent>,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSave(): void {
    this.userService.updateProfileImage(
      Number(this.localStorageService.get('userId')),
      this.selectedFile
    ).subscribe(() => {
      this.dialogRef.close();
      this.showSuccessSnackBar();
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private showSuccessSnackBar() {
    this.snackBar.openFromComponent(StyledToastComponent, {
      duration: 5000,
      data: {
        icon: 'done',
        message: 'Profile picture saved successfully!'
      },
      panelClass: 'success-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
