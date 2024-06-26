import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  database: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.database = localStorage.getItem('database');
  }

  openTask() {
    this.router.navigateByUrl(this.database + "/bug");
  }
}
