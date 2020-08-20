import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { multi } from './data';
import { DataServiceService } from '../data-service.service';
import { ApiStateData } from '../data-table/apidata.model';


@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent implements OnInit {
  e2: Array<ApiStateData>;
  e1: Array<ApiStateData>;
  errorMessage: string;

  ngOnInit(): void {
    this.getStateData();
  }
  multi: any[];
  view: any[] = [500, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Month';
  yAxisLabel: string = 'Cases';
  timeline: boolean = true;


  colorScheme = {
    domain: ['#aae3f5','#33CCFF','#0000FF','#CC33FF','#FF3333', '#FF33FF']
  };

  constructor(private apidata: DataServiceService) {
    Object.assign(this, { multi });
  }
  getStateData() {
    this.apidata.getStateWiseData().subscribe(
      e1 => {
        this.e1 = JSON.parse(JSON.stringify(e1)).data.history;
        console.log(this.e1[0].day);
        this.fill();
      },
      error => this.errorMessage = <any>error
    )
  }

  fill() {
    if (this.e1) {
     this.e1=this.e1.sort();
      for (var i = 0; i < this.e1.length; i++) {
        var ddd=[];
        var hello ={};
        for (var j = 0; j < 5; j++) {
          hello ={
              value: this.e1[i].statewise[j].confirmed,
              name: this.e1[i].statewise[j].state
          }
          
          ddd.push(hello);
        }
          console.log(ddd);
          var person = {
            name: this.e1[i].day,
            series: ddd
          };
        
        this.multi.push(person);
        i=i+30;
      }
      this.multi = JSON.parse(JSON.stringify(this.multi));
      console.log(this.multi);
    }

  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
