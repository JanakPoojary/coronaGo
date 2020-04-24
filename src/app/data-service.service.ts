import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Apidata } from './data-table/apidata.model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  url:string="https://api.rootnet.in/covid19-in/stats/latest";

  constructor(private http: HttpClient) { }
  getData():Observable<Apidata[]>{
    return this.http.get<Apidata[]>(this.url).pipe(
      tap(data => console.log(JSON.parse(JSON.stringify(data)).data.regional)),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
