import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
import { Apidata } from '../data-table/apidata.model';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-pie-graph',
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.css']
})
export class PieGraphComponent implements OnInit {

  e1:Array<Apidata>;
  e2:Array<Apidata>;
  errorMessage:string;
  ngOnInit(): void {
    this.getData();
  }
  single: any[];
  view: any[] = [500, 400];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private apidata: DataServiceService) {
    Object.assign(this, { single });
  }
  getData(){
    this.apidata.getData().subscribe(
      e1 => {
        this.e1 = JSON.parse(JSON.stringify(e1)).data.regional;
        this.fill();
      },
      error => this.errorMessage = <any>error
    )
  }
  fill(){
    this.e2=this.e1.sort(function(a,b){return a.confirmedCasesIndian-b.confirmedCasesIndian}).reverse();
    this.e2=this.e2.slice(0,9);
    for(var i=0;i<this.e2.length;i++){
      var person = {
        name: this.e2[i].loc,
        value: this.e2[i].confirmedCasesIndian
      };
      console.log(this.e1[i].loc);
      this.single.push(person);
    }
    console.log("---------------------------");
    console.log(JSON.stringify(this.single));
    this.single=JSON.parse(JSON.stringify(this.single));
  }
  onSelect(event) {
    console.log(event);
  }
  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
}
}
