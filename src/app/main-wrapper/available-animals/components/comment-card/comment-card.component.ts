import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentResponseModel } from '../../../../core/model/comment/CommentResponse.model';
import { CommentService } from '../../../../core/services/comment/comment.service';
import { LocalStorageService } from '../../../../core/services/utils/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentDialogComponent } from '../add-comment-dialog/add-comment-dialog.component';
import { AnimalResponseModel } from '../../../../core/model/animal/AnimalResponse.model';
import { DeleteDialogComponent } from '../../../../core/components/dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss'
})
export class CommentCardComponent {
  @Input() comment!: CommentResponseModel;
  @Input() animal!: AnimalResponseModel;

  @Output() emitOnCommentChange = new EventEmitter();

  protected userId: number | undefined = undefined;
  starsArray: number[] = [0, 1, 2, 3, 4];

  constructor(
    private commentService: CommentService,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
  ) {
    this.userId = this.localStorageService.get('userId');
  }

  protected onDeleteComment() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        type: 'comment',
        id: this.comment.id,
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.emitOnCommentChange.emit()
    })
  }

  protected onEditComment() {
    const dialogRef = this.dialog.open(AddCommentDialogComponent, {
      data: {
        animal: this.animal,
        comment: this.comment,
        editModeEnabled: true,
      }
    })

    dialogRef.afterClosed().subscribe(() => {
     this.emitOnCommentChange.emit();
    });
  }

  protected onLikeClick(commentId: number) {
    this.commentService.incrementLikes(
      commentId,
      this.localStorageService.get('userId'),
    ).subscribe((response: CommentResponseModel) => {
      this.comment.likes = response.likes;
      this.comment.dislikes = response.dislikes;
      this.comment.currentUserReactionType = response.currentUserReactionType;
    });
  }

  protected onDislikeClick(commentId: number) {
    this.commentService.incrementDislikes(
      commentId,
      this.localStorageService.get('userId'),
    ).subscribe((response: CommentResponseModel) => {
      this.comment.likes = response.likes;
      this.comment.dislikes = response.dislikes;
      this.comment.currentUserReactionType = response.currentUserReactionType;
    });
  }
}
