import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;
  database: any;
  notificationList: any[] = [];
  notificationCount: number = 0;

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatMenuTrigger, { static: true })
  trigger!: MatMenuTrigger;
  userId: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.database = localStorage.getItem('database');
    this.userId = localStorage.getItem('userid')
    this.loadNotifications();
  }
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logout() {

  }
  loadNotifications() {

  }
  notificationClose() {

  }

  clearNotification(task: any) {
    console.log(task);
    this.trigger.closeMenu();
    this.deleteNotification(task.bugId);
    this.router.navigate([this.database + '/bug/viewtask'], { queryParams: { id: task.bugId } });
  }

  deleteNotification(bugId: any) {

  }

}
