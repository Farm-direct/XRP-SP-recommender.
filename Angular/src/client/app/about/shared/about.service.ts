import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AboutService {
    constructor(private http: Http) { }


    public getHistory(): Observable<any> {
        return this.http.get('http://localhost:4000/history').map((response:any) => {
            return response.json();
        });
    }

}