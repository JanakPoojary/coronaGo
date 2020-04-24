import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
import { DataServiceService } from '../data-service.service';
import { Apisum } from '../apisum.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  e1:Apisum;
  e2:Apisum;
  errorMessage:string;

  ngOnInit(): void {
    this.getData();
  }
  single: any[];
  view: any[] = [400, 250];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#232837';
  
  constructor(private apidata: DataServiceService) {
    Object.assign(this, { single });
  }
  getData(){
    this.apidata.getData().subscribe(
      e1 => {
        this.e1 = JSON.parse(JSON.stringify(e1)).data.summary;
        this.fill();
      },
      error => this.errorMessage = <any>error
    )
  }
  fill(){
      this.single = [{
        name: "Total Confirmed Cases",
        value: this.e1.total
      },
      {
        name: "Confirmed Cases Indian",
        value: this.e1.confirmedCasesIndian
      },
      {
        name: "Confirmed Cases Foreign",
        value: this.e1.confirmedCasesForeign
      },
      {
        name: "Total Recovered Cases",
        value: this.e1.discharged
      },
      {
        name: "Total Deaths",
        value: this.e1.deaths
      }];
    this.single=JSON.parse(JSON.stringify(this.single));
  }

  onSelect(event) {
    console.log(event);
  }
  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
}

}