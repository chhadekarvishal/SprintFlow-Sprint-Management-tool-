import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Observable } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IssuesComponent } from '../issues/issues.component';

interface Project {
  name: string;
  value: string;
}
interface Sprint {
  name: string;
  value: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoading = false;
  database: any;
  panelOpenState = false;
  isUser: boolean = true;
  projectList: any[] = [];
  SprintList: any[] = [];
  projectId: any;
  sprintId: any;
  selectedProject: any;
  filteredOptionUserId!: Observable<any[]>;
  resoucesCount: number = 0;
  pieChartData: any[] = [];
  ticketsCountsForbarChartData: any[] = [];
  qaIssuesCountsForbarChartData: any[] = [];
  dataSource: any[] = [];
  showPieChart: boolean = true;
  showBarChart: boolean = true;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  displayedColumns: string[]
    = ['resourceType', 'resources_name', 'tickets', 'completed', 'in_progress',
      'taskOverdue', 'percentage_completed', 'dependencies', 'availability'];
  ticketsCountsForBarChartOnLoad: any = [15, 13, 9];
  qaIssuesCountsForBarChartOnLoad: any = [12, 17, 5];
  sprintTickets: any;
  sprintQaIssues: any;
  completedStoryPoints: number = 0;
  plannedStoryPoints: number = 0;
  completedQaIssues: number = 0;
  plannedQaIssues: number = 0;
  assignedQaIssues: number = 0;
  pieChartDataOnLoad: any = [
    {
      name: 'Completed',
      y: 54.77
      // color: 'red',
    },
    {
      name: 'In Progress',
      y: 12.82,
    },
    {
      name: 'QA Verified',
      y: 4.63,
    },
    {
      name: 'Open',
      y: 12.44,
    },
    {
      name: 'Closed',
      y: 12.02,
    },
    {
      name: 'Other',
      y: 3.28,
    }
  ];
  dummyData = [
    {
      resourceType: 'FE',
      resources_name: 'Resource 1',
      tickets: 10,
      completed: 8,
      in_progress: 2,
      taskOverdue: false,
      percentage_completed: 80,
      dependencies: ['Dependency 1', 'Dependency 2'],
      availability: 'Full-time'
    },
    {
      resourceType: 'BE',
      resources_name: 'Resource 2',
      tickets: 5,
      completed: 3,
      in_progress: 2,
      taskOverdue: true,
      percentage_completed: 60,
      dependencies: ['Dependency 3'],
      availability: 'Part-time'
    },
    {
      resourceType: 'FSD',
      resources_name: 'Resource 3',
      tickets: 7,
      completed: 7,
      in_progress: 0,
      taskOverdue: false,
      percentage_completed: 100,
      dependencies: [],
      availability: 'Full-time'
    },
    {
      resourceType: 'FSD',
      resources_name: 'Resource 4',
      tickets: 12,
      completed: 9,
      in_progress: 3,
      taskOverdue: false,
      percentage_completed: 75,
      dependencies: ['Dependency 4'],
      availability: 'Full-time'
    },
    {
      resourceType: 'FE',
      resources_name: 'Resource 5',
      tickets: 3,
      completed: 2,
      in_progress: 1,
      taskOverdue: false,
      percentage_completed: 66.67,
      dependencies: ['Dependency 1', 'Dependency 3'],
      availability: 'Part-time'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.getProjectList();
    this.getResoucesCount();
    this.dataSource = this.dummyData;
  }

  getTaskSummaryByResources() { }

  SprintTickets() { }

  SprintqaIssues() { }

  taskByStatusDataForPie() { }

  TicketsCountsByPriorityForBarChart() { }


  QaIssuesCountsByPriorityForBarChart() { }


  getResoucesCount() { }

  public ngAfterViewInit(): void {
    if (this.showPieChart) {
      this.createChartPie(this.pieChartDataOnLoad);
    }
    if (this.showBarChart) {
      this.createStackedChart(this.qaIssuesCountsForBarChartOnLoad, this.ticketsCountsForBarChartOnLoad);
    }
  }

  getProjectList(): void { }

  getSprintList() { }

  onSelectionProjectChange(event: any) {
    this.projectId = event.id;
    this.selectedProject = event.projectName;
    if (this.projectId != null) {
      this.getSprintList();
    } else return
  }

  onSelectionSprintChange(event: any) {
    this.projectId = event.project.id;
    this.sprintId = event.id;
    this.selectedProject = event.projectName;
    if (this.sprintId != null && this.projectId !== null) {
      this.taskByStatusDataForPie();
      this.QaIssuesCountsByPriorityForBarChart();
      this.TicketsCountsByPriorityForBarChart();
      this.getTaskSummaryByResources();
      this.SprintqaIssues();
      this.SprintTickets();
      if (this.showPieChart) {
        this.createChartPie(this.pieChartData);
      }
      if (this.showBarChart) {
        this.createStackedChart(this.qaIssuesCountsForbarChartData, this.ticketsCountsForbarChartData)
      }
    } else return
  }



  //Pie chart
  private createChartPie(pieChartData: any): void {
    const chart = Highcharts.chart('chart-pie', {
      credits: {
        enabled: false
      },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Tasks By Status',
        align: 'left'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            connectorColor: 'silver'
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Tasks',
        colorByPoint: true,
        data: pieChartData,
      }]
    } as any);
  }

  //Bar chart
  private createStackedChart(qaissues: any, tickets: any): void {
    const chart = Highcharts.chart('bar-chart', {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column'
      },
      title: {
        text: 'Task & QA Issues Based On Priority',
        align: 'left'
      },
      xAxis: {
        categories: [
          'High',
          'Medium',
          'Low',
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        max: 30,
        title: {
          text: 'Tasks & QA Issues (No.)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        }
      },
      series: [{
        name: 'Task',
        data: tickets

      }, {
        name: 'QA Issues',
        data: qaissues
      }]
    } as any);
  }
  viewClick(data: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "1080px";
    dialogConfig.height = "1080px";
    dialogConfig.minHeight = "430px";
    dialogConfig.data = { title: "", body: data };
    const dialogRef = this.dialog.open(IssuesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      // this.router.navigate(["/admin/invoice"]);
    });
  }

  //STATIC DATA:
  PROJECTS: Project[] = [
    { name: 'Project 1', value: 'project1' },
    { name: 'Project 2', value: 'project2' },
    { name: 'Project 3', value: 'project3' },
    { name: 'Project 4', value: 'project4' },
    { name: 'Project 5', value: 'project5' },
    { name: 'Project 6', value: 'project6' },
    { name: 'Project 7', value: 'project7' },
    { name: 'Project 8', value: 'project8' },
    { name: 'Project 9', value: 'project9' },
    { name: 'Project 10', value: 'project10' }
  ];


  SPRINTS: Sprint[] = [
    { name: 'Sprint 1', value: 'sprint1' },
    { name: 'Sprint 2', value: 'sprint2' },
    { name: 'Sprint 3', value: 'sprint3' },
    { name: 'Sprint 4', value: 'sprint4' },
    { name: 'Sprint 5', value: 'sprint5' },
    { name: 'Sprint 6', value: 'sprint6' },
    { name: 'Sprint 7', value: 'sprint7' },
    { name: 'Sprint 8', value: 'sprint8' },
    { name: 'Sprint 9', value: 'sprint9' },
    { name: 'Sprint 10', value: 'sprint10' }
  ];

  totalResource: number = 22;


}