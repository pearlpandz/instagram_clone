import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CanActivate , Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
	HttpResponse, HttpUserEvent} from '@angular/common/http';

import { HomeComponent } from './../home/home.component';

@Injectable()

export class PostService implements OnInit{

  constructor(
	  private http: HttpClient,
	  private router: Router
	) { }

    ngOnInit() {
    }

	get(post: HomeComponent) {
		console.log(post);
		// this.http.post<any>('http://localhost:3000/post', post)
		// .subscribe(data => {
		// 	if(data){
		// 		alert("update");
		// 	}
		// },error=>{
		// 	  console.log(error);
		// 	}
		// );

		this.http.post('http://localhost:3000/post', post).subscribe(data => {
			console.log(data); // using the HttpClient instance, http to call the API then subscribe to the data and display to console
		});

	}

	private handleError(error: HttpErrorResponse) {
		console.error('server error:', error);
		if (error.error instanceof Error) {
			const errMessage = error.error.message;
			return Observable.throw(errMessage);
			// Use the following instead if using lite-server
			// return Observable.throw(err.text() || 'backend server error');
		}
		return Observable.throw(error || 'Server error');
}


}