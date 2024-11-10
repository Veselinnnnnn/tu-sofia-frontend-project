import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from '../../../../core/services/comment/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../../core/services/utils/local-storage.service';

@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrl: './add-comment-dialog.component.scss'
})
export class AddCommentDialogComponent {
  commentForm!: FormGroup;
  editModeEnabled = false;
  starsArray: number[] = [1, 2, 3, 4, 5];
  selectedRating: number | undefined = undefined;
  hoveredRating = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<AddCommentDialogComponent>,
    private localStorageService: LocalStorageService,
    private commentService: CommentService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.createForm();

    this.editModeEnabled = this.data?.editModeEnabled;
  }

  protected setRating(rating: number): void {
    this.selectedRating = rating;
    this.commentForm.patchValue({rating: rating});
  }

  protected setHoveredRating(rating: number): void {
    this.hoveredRating = rating;
  }

  protected resetHoveredRating(): void {
    this.hoveredRating = 0;
  }

  protected cancel() {
    this.matDialogRef.close();
  }

  protected submit() {
    this.commentForm.markAllAsTouched();
    if (this.commentForm.valid) {
      const commentData = {
        content: this.commentForm.value.content,
        rating: this.commentForm.value.rating
      };

      if (this.editModeEnabled) {
        this.commentService.updateComment(
          this.data.comment.id,
          commentData,
        ).subscribe(() => {
          this.matDialogRef.close();
        })
      } else {
        this.commentService.addComment(
          this.data.animal.id,
          Number(this.localStorageService.get('userId')),
          commentData
        ).subscribe(() => {
          this.matDialogRef.close();
        });
      }
    }
  }

  private createForm() {
    this.commentForm = this.formBuilder.group({
      content: [this.data.comment?.content, Validators.required],
      rating: [this.data.comment?.rating, Validators.required]
    });

    console.log(this.data);
    if (this.data.comment?.rating) {
      console.log("kurecccccc");
      this.selectedRating = this.data.comment.rating;
      console.log(this.selectedRating);
    }
  }
}
