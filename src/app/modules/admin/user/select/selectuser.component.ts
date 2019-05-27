import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef, OnDestroy } from '@angular/core';
import { AdminselectuserService } from './selectuser.service';
import { AdminUserSelectInitialData, UserDeleteResponse, UserTransfer } from './selectuser-request-response';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-selectuser',
  templateUrl: './selectuser.component.html',
  styleUrls: ['./selectuser.component.css']
})

export class SelectuserComponent implements OnInit, OnDestroy, AfterViewInit {
  users: UserTransfer[];
  modalRef: BsModalRef;
  adminUserSelectInitialData: AdminUserSelectInitialData;
  userIdToDelete: number;
  canNotDelete: Boolean;
  navigationSubscription;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'email', 'edit', 'delete'];
  dataSource;

  constructor(
    private adminUserService: AdminselectuserService,
    private modalService: BsModalService,
    private router: Router
  ) {
    // https://medium.com/engineering-on-the-incline/reloading-current-route-on-click-angular-5-1a1bfc740ab2
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
       // this.getUserSelectInitialData();
      }
    });
  }

  ngOnInit() {
  this.getUserSelectInitialData();
  this.dataSource = new MatTableDataSource(this.users);
  this.dataSource.sort = this.sort;
  }

  private getUserSelectInitialData(): void {
    this.adminUserService.getInitialData().subscribe(
      (adminUserInitialData: AdminUserSelectInitialData) => {
        this.users = adminUserInitialData.users;
        this.dataSource = new MatTableDataSource(adminUserInitialData.users);
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private forwardToSelectUser(): void {
    const url = '/admin/user/select';
    this.router.navigate([url]);
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  deleteConfirmation(template: TemplateRef<any>, userId) {
    this.userIdToDelete = userId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

 confirm() {
    this.adminUserService.delete(this.userIdToDelete).subscribe(
      (userDeleteResponse: UserDeleteResponse) => {
        if (userDeleteResponse.deleted) {
          this.forwardToSelectUser();
        } else {
          this.canNotDelete = true;
        }
      }
    );

    this.modalRef.hide();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  decline() {
    this.modalRef.hide();
  }
}
