import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../../../../../core/services/animal/animal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StyledToastComponent } from '../../../../../shared/components/styled-toast/styled-toast.component';


@Component({
  selector: 'app-create-animal',
  templateUrl: './create-animal.component.html',
  styleUrl: './create-animal.component.scss'
})
export class CreateAnimalComponent implements OnInit {
  animalForm!: FormGroup;
  imageFile: File | null = null;
  imagePreview: string | null = null;
  isEdit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateAnimalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private animalService: AnimalService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.createForm();

    if (this.data?.animal) {
      this.isEdit = true;
      this.populateFormForEdit(this.data.animal);
    }
  }

  createForm(): void {
    this.animalForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      breed: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      slogan: ['', Validators.required]
    });
  }

  populateFormForEdit(animal: any): void {
    this.animalForm.patchValue({
      name: animal.name,
      type: animal.type,
      breed: animal.breed,
      age: animal.age,
      description: animal.description,
      slogan: animal.slogan
    });

    if (animal.img) {
      this.imagePreview = animal.img;
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    } else {
      this.imageFile = null;
      this.imagePreview = null;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.animalForm.invalid || (!this.imageFile && !this.isEdit)) {
      return;
    }

    const formData = new FormData();

    if (this.isEdit) {
      formData.append('id', this.data.animal.id);
      const imageBlob = this.base64ToBlob(this.imagePreview!, 'image/png'); // Adjust the MIME type as needed
      formData.append('img', imageBlob);
      Object.keys(this.animalForm.value).forEach(key => {
        formData.append(key, this.animalForm.value[key]);
      });
    } else {
      formData.append('img', this.imageFile!);
      formData.append('animal', new Blob([JSON.stringify(this.animalForm.value)], { type: 'application/json' }));
    }

    if (this.isEdit) {
      this.animalService.updateAnimal(formData).subscribe({
        next: () => {
          this.showSuccessSnackBar('Animal updated successfully!');
          this.dialogRef.close(true);
        },
        error: () => {
          this.showErrorSnackBar('Error updating animal!');
        }
      });
    } else {
      this.animalService.createAnimal(formData).subscribe({
        next: () => {
          this.showSuccessSnackBar('Animal created successfully!');
          this.dialogRef.close(true);
        },
        error: () => {
          this.showErrorSnackBar('Error creating animal!');
        }
      });
    }
  }

  private showSuccessSnackBar(message: string) {
    this.snackBar.openFromComponent(StyledToastComponent, {
      duration: 5000,
      data: { icon: 'done', message },
      panelClass: 'success-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  private showErrorSnackBar(message: string) {
    this.snackBar.openFromComponent(StyledToastComponent, {
      duration: 5000,
      data: { icon: 'error', message },
      panelClass: 'error-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  private base64ToBlob(base64: string, mimeType: string = ''): Blob {
    const byteString = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: mimeType });
  }
}
