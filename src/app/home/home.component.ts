import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
  }
  single: any[];
  view: any[] = [400, 250];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#232837';
  
  constructor() {
    Object.assign(this, { single });
  }

  onSelect(event) {
    console.log(event);
  }
  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
}

}