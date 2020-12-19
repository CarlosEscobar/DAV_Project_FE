import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import sjcl  from 'sjcl';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectorService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:60480';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  doLogin(username: string, password: string) {
    return this
            .http
            .put(
              `${this.apiUrl}/authentication`,
              {
                'Username': username,
                'Password': sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password))
              },
              this.httpOptions
            )
            .pipe(catchError(this.handleError));
  }

  doRegister(name: string, username: string, password: string) {
    return this
            .http
            .post(
              `${this.apiUrl}/authentication`,
              {
                'Name': name,
                'Username': username,
                'Password': sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password))
              },
              this.httpOptions
            )
            .pipe(catchError(this.handleError));
  }

}
