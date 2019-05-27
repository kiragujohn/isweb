import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef, OnDestroy } from '@angular/core';
import { UserselectaccountService } from './selectaccount.service';
import { AccountDeleteResponse, UserSelectAccountInitialData, Account } from './selectaccount-request-response';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-selectaccount',
  templateUrl: './selectaccount.component.html',
  styleUrls: ['./selectaccount.component.css']
})

export class SelectaccountComponent implements OnInit, OnDestroy, AfterViewInit {
  accounts: Account[];
  modalRef: BsModalRef;
  userSelectAccountInitialData: UserSelectAccountInitialData;
  userIdToDelete: number;
  canNotDelete: Boolean;
  navigationSubscription;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Account Number', 'Type', 'Status', 'Edit'];
  dataSource;

  constructor(
    private userselectaccountService: UserselectaccountService,
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
  // this.getUserSelectInitialData();
  this.accounts = [
    { 'id': 1, 'accountNumber': 111111, 'accountType': 'Cheque', 'active': true },
    { 'id': 1, 'accountNumber': 222222, 'accountType': 'Savings', 'active': true },
    { 'id': 1, 'accountNumber': 333333, 'accountType': 'Transaction', 'active': false }
  ];
  this.dataSource = new MatTableDataSource(this.accounts);
  this.dataSource.sort = this.sort;
  }

  private getAccountSelectInitialData(): void {
    this.userselectaccountService.getInitialData().subscribe(
      (userSelectAccountInitialData: UserSelectAccountInitialData) => {
        // this.users = adminUserInitialData.users;
        this.dataSource = new MatTableDataSource(userSelectAccountInitialData.accounts);
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private forwardToSelectUser(): void {
    const url = '/user/account/select';
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  decline() {
    this.modalRef.hide();
  }
}
