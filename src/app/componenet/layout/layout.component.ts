import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  sideBarOpen = true;

  // New implemation
  sideBarToggler(even: any) {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
