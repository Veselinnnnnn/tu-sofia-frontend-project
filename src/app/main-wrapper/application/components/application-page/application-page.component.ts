import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationService } from '../../../../core/services/application/application.service';
import { LocalStorageService } from '../../../../core/services/utils/local-storage.service';
import { RequestWalkComponent } from '../../../available-animals/components/request-walk/request-walk.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../../core/components/dialog/delete-dialog/delete-dialog.component';
import {
  RequestAdoptionComponent
} from '../../../available-animals/components/request-adoption/request-adoption.component';
import { ApplicationResponse } from '../../../../core/model/application/ApplicationResponse.model';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.scss'
})
export class ApplicationPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'date', 'animalId', 'pickUpTime', 'returnTime', 'requestType', 'status', 'action'];
  dataSource = new MatTableDataSource<ApplicationResponse>();
  color = 'white';
  backgroundColor = '#CF6CB3';

  constructor(
    private localStorageService: LocalStorageService,
    private applicationService: ApplicationService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  edit(request: any) {
    let componentToOpen: any;
    let dialogSize: string = '400px'; // Default size for walk requests

    if (request.requestType === 'WALK') {
      componentToOpen = RequestWalkComponent;
    } else if (request.requestType === 'ADOPTION') {
      componentToOpen = RequestAdoptionComponent;
      dialogSize = '800px'; // Set size for adoption requests
    }

    const dialogRef = this.matDialog.open(componentToOpen, {
      width: dialogSize,
      height: request.requestType === 'ADOPTION' ? '800px' : undefined, // Only set height for adoption
      data: { request: request }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  delete(request:any) {
    const dialogRef = this.matDialog.open(DeleteDialogComponent, {
      data: {
        type: 'application',
        id: request
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    })
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'badge-pending';
      case 'APPROVED':
        return 'badge-approved';
      case 'DENIED':
        return 'badge-denied';
      default:
        return '';
    }
  }

  private getData() {
    this.applicationService.getAllByUser(
      this.localStorageService.get('userId')
    ).subscribe(requests => {
      this.dataSource.data = requests;
    });
  }
}
