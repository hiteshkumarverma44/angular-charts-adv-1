import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}

  // Chart Options (Styling and Interactivity)
  public barChartOptions: ChartOptions = {
    responsive: true, // Makes chart responsive
    maintainAspectRatio: false, // Allows custom height/width
    scales: {
      x: {
        grid: { display: false }, // Hide grid lines on X-axis
        title: { display: true, text: 'Months', color: '#666' }, // X-axis label
      },
      y: {
        grid: { display: true }, // grid lines Y-axis
        beginAtZero: true, // Start y-axis at 0
        ticks: { stepSize: 10 }, // Y-axis increments
        title: { display: true, text: 'Sales ($)', color: '#666' }, // Y-axis label
      },
    },
    plugins: {
      legend: { display: true, position: 'top' }, // Legend config
      tooltip: {
        enabled: true, // Enable hover tooltips
        backgroundColor: 'rgba(0,0,0,0.7)',
        bodyColor: 'white',
      },
    },
    animation: {
      duration: 2000, // Animation duration in milliseconds
      easing: 'easeOutBounce', // Animation effect
    },
  };

  // Chart Labels (X-Axis)
  public barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

  public barChartType = 'bar';
  public barChartLegend = true;

  // Chart Data
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        label: 'Sales 2024',
        data: [10, 60, 75, 90, 110], // Initial data
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#9966FF',
        ],
      },
    ],
  };

  // Fetch Data from API on Init
  ngOnInit() {
    this.fetchChartData();
  }

  // API Call to Fetch Data
  fetchChartData() {
    this.http
      .get<{ month: string; sales: number }[]>('http://localhost:5000/api/data')
      .subscribe((response) => {
        this.barChartLabels = response.map((item) => item.month);
        this.barChartData.datasets[0].data = response.map((item) => item.sales);

        console.log(this.barChartData.datasets[0].data);

        // Trigger change detection manually to reflect updates
        this.cdRef.detectChanges();

        // Update chart manually
        if (this.chart) {
          this.chart.chart.update();
        }
      });
  }
}
