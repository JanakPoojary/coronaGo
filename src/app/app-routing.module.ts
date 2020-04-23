import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { DataTableComponent } from './data-table/data-table.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { PieGraphComponent } from './pie-graph/pie-graph.component';


const routes: Routes = [
  { path: 'home', component: MainNavComponent, children:[
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    { path: 'dashboard', component: DataTableComponent},
    {path: '', component: LineGraphComponent, outlet:'line-graph'},
    {path: '', component: PieGraphComponent, outlet:'pie-graph'},
    {path: '', component: HomeComponent, outlet:'entry'}
  ]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
