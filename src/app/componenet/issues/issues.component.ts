import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  resourcesData: any;
  // dataSource: any[] = [];
  displayedColumns: string[]
    = ['tickets', 'qaIssues', 'qa_person', 'completed', 'in_progress',
      'reported_date', 'start_date', 'end_date', 'perc_completion',
      'comments', 'action'];

  dataSource: any[] = [
    {
      tickets: '#9043',
      qaIssues: 9,
      qa_person: 'Person 1',
      completed: 4,
      in_progress: 5,
      reported_date: '14 Jun, 23',
      start_date: '14 Jun, 23',
      end_date: '16 Jun, 23',
      perc_completion: 40,
      comments: '-'
    },
    {
      tickets: '#1234',
      qaIssues: 2,
      qa_person: 'Person 2',
      completed: 1,
      in_progress: 1,
      reported_date: '14 Jun, 23',
      start_date: '14 Jun, 23',
      end_date: '15 Jun, 23',
      perc_completion: 50,
      comments: 'Some comments'
    },
    {
      tickets: '#5678',
      qaIssues: 0,
      qa_person: 'Person 3',
      completed: 0,
      in_progress: 0,
      reported_date: '14 Jun, 23',
      start_date: '14 Jun, 23',
      end_date: '14 Jun, 23',
      perc_completion: 0,
      comments: 'No comments'
    },
    {
      tickets: '#9876',
      qaIssues: 5,
      qa_person: 'Person 4',
      completed: 2,
      in_progress: 3,
      reported_date: '14 Jun, 23',
      start_date: '14 Jun, 23',
      end_date: '17 Jun, 23',
      perc_completion: 30,
      comments: 'Some other comments'
    },
    {
      tickets: '#2468',
      qaIssues: 1,
      qa_person: 'Person 5',
      completed: 1,
      in_progress: 0,
      reported_date: '14 Jun, 23',
      start_date: '14 Jun, 23',
      end_date: '15 Jun, 23',
      perc_completion: 100,
      comments: '-'
    }
  ];
  database: any;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<IssuesComponent>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.resourcesData = this.data.body
  }
  viewClick(data: any) {

  }
  close() {
    this.dialogRef.close();
  }

  addQAIssues() {
    this.dialogRef.close();

  }
}
