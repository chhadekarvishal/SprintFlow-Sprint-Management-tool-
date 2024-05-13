import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { LayoutComponent } from './componenet/layout/layout.component';
import { SidenavComponent } from './componenet/layout/sidenav/sidenav.component';
import { HeaderComponent } from './componenet/layout/header/header.component';
// import { DashboardComponent } from './componenet/dashboard/dashboard.component';
import { IssuesComponent } from './componenet/issues/issues.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidenavComponent,
    HeaderComponent,
    // DashboardComponent,
    IssuesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
