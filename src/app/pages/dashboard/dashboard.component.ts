import { Component,OnInit } from '@angular/core';
import { BulkValidation } from './model/bulk';
import {BulkService} from './service/bulk.service';
import { Subscription, debounceTime } from 'rxjs';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  bulk!: BulkValidation[];

  pieData: any;

  pieOptions: any;

  cols: any[] = [];

  items!: MenuItem[];

  chartData: any;

  chartOptions: any;


constructor(
  public bulkService: BulkService
){}

  ngOnInit() {
    this.bulkService
        .getBulk()
        .then((data) => (this.bulk = data));

        this.cols = [
          { header: 'Request Id', field: 'requestId' },
          { header: 'Submission Date', field: 'submissionDate' },
          { header: 'Status', field: 'status' },
          {header: 'Records Processed', field: 'recordsProcessed' },
          { header: 'Success Rate', field: 'successRate' },
          { header: 'Errors', field: 'errors' },
      ]
    this.chartInit();
  }

  chartInit() {
    const textColor =
        getComputedStyle(document.body).getPropertyValue('--text-color') ||
        'rgba(0, 0, 0, 0.87)';
    const surface300 = getComputedStyle(document.body).getPropertyValue(
        '--surface-300'
    );
    const documentStyle = getComputedStyle(document.documentElement);


    this.items = [
      {
          label: 'Options',
          items: [
              { label: 'Add New', icon: 'pi pi-fw pi-plus' },
              { label: 'Search', icon: 'pi pi-fw pi-search' },
          ],
      },
  ];

  this.chartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
          {
              label: 'New',
              data: [11, 17, 30, 60, 88, 92],
              backgroundColor: 'rgba(13, 202, 240, .2)',
              borderColor: '#0dcaf0',
              pointBackgroundColor: '#0dcaf0',
              pointBorderColor: '#0dcaf0',
              pointBorderWidth: 0,
              pointStyle: 'line',
              fill: false,
              tension: 0.4,
          },
          {
              label: 'Completed',
              data: [11, 19, 39, 59, 69, 71],
              backgroundColor: 'rgba(253, 126, 20, .2)',
              borderColor: '#fd7e14',
              pointBackgroundColor: '#fd7e14',
              pointBorderColor: '#fd7e14',
              pointBorderWidth: 0,
              pointStyle: 'line',
              fill: false,
              tension: 0.4,
          },
          {
              label: 'Canceled',
              data: [11, 17, 21, 30, 47, 83],
              backgroundColor: 'rgba(111, 66, 193, .2)',
              borderColor: '#6f42c1',
              pointBackgroundColor: '#6f42c1',
              pointBorderColor: '#6f42c1',
              pointBorderWidth: 0,
              pointStyle: 'line',
              fill: true,
              tension: 0.4,
          },
      ],
  };

  this.chartOptions = {
      plugins: {
          legend: {
              fill: true,
              labels: {
                  color: textColor,
              },
          },
      },
      scales: {
          y: {
              max: 100,
              min: 0,
              grid: {
                  color: surface300,
              },
              ticks: {
                  color: textColor,
              },
          },
          x: {
              grid: {
                  display: true,
                  color: surface300,
              },
              ticks: {
                  color: textColor,
                  beginAtZero: true,
              },
          },
      },
  };

    this.pieData = {
      labels: ['Success ', 'Pending','Error'],
      datasets: [
          {
              data: [740, 325, 502],
              backgroundColor: [
                  documentStyle.getPropertyValue('--green-500'),
                  documentStyle.getPropertyValue('--yellow-500'),
                  documentStyle.getPropertyValue('--red-500'),

              ],
              hoverBackgroundColor: [
                  documentStyle.getPropertyValue('--green-400'),
                  documentStyle.getPropertyValue('--yellow-400'),
                  documentStyle.getPropertyValue('--red-400'),
              ],
          },
      ],
  };

  this.pieOptions = {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
                  color: textColor,
              },
          },
      },
  };
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
        (event.target as HTMLInputElement).value,
        'contains'
    );
}
}
