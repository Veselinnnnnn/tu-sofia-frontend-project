import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnInit, Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/authentication/user.service';
import { LocalStorageService } from '../../../../core/services/utils/local-storage.service';
import { CreateAnimalComponent } from '../dialogs/create-animal/create-animal.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../../core/components/dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.scss'
})
export class AnimalCardComponent implements OnInit, AfterViewInit {
  @ViewChild('miniDescription') miniDescriptionRef!: ElementRef;

  @Input() img!: string;
  @Input() id!: number;
  @Input() nameOnHover!: string;
  @Input() textOnHover!: string;
  @Input() age!: number;
  @Input() breed!: string;
  @Input() miniDescription: string = '';
  @Input() type: string = '';

  @Output() refreshDateEvent = new EventEmitter();
  protected isAdmin = false;
  protected isDropdownOpen = false;
  protected truncatedMiniDescription: string = '';
  protected isTruncated = false;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getUserRole();
  }

  ngAfterViewInit() {
    this.truncatedMiniDescription = this.miniDescription;
    this.truncateText();
    this.cdr.detectChanges();
  }

  truncateText() {
    const container = this.miniDescriptionRef.nativeElement;
    const containerWidth = container.offsetWidth;

    this.renderer.addClass(container, 'truncated');

    while (container.scrollWidth > containerWidth && this.truncatedMiniDescription.length > 0) {
      this.truncatedMiniDescription = this.truncatedMiniDescription.slice(0, -1).trim() + '...';
    }

    this.isTruncated = true;
  }

  protected editAnimal() {
    this.toggleDropdown();
    const animalData = {
      img: this.img,
      id: this.id,
      name: this.nameOnHover,
      slogan: this.textOnHover,
      age: this.age,
      breed: this.breed,
      description: this.miniDescription,
      type: this.type,
    }

    const dialogRef = this.dialog.open(CreateAnimalComponent, {
      width: '400px',
      data: { animal: animalData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refreshDateEvent.emit();
    });
  }

  protected deleteAnimal() {
    this.toggleDropdown();
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        type: 'animal',
        id: this.id,
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshDateEvent.emit();
    })
  }

  protected navigateToAnimalDetails() {
    this.router.navigate(['available-animals/animal', this.id])
  }

  protected toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  private getUserRole() {
    this.userService.getBasicInfo(
      this.localStorageService.get('userId')
    ).subscribe((response) => {
      this.isAdmin = response.role === 'ADMIN';
    });
  }
}
