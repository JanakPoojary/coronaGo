import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Apidata } from './apidata.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  e1:Array<Apidata>;
  errorMessage:string;
  num:number=7;
  ngOnInit() {
    this.getData();
  }
/**
 *
 */
constructor(private apidata: DataServiceService) {
}
  ngAfterViewInit() {
  }
  getData(){
    this.apidata.getData().subscribe(
      e1 => {
        return this.e1 = JSON.parse(JSON.stringify(e1)).data.regional;
      },
      error => this.errorMessage = <any>error
    )
  }
  give(n: number) {
    return this.e1.slice(n-7,n);
  }
  next(){
    if(this.num<=this.e1.length){
    this.num=this.num+7;
    }
  }
  prev(){
    if(this.num>7){
    this.num=this.num-7;
    }
  }
}
