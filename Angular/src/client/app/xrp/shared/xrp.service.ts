import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class XrpService {
    constructor(private http: Http) { }


    public getHistory(): Observable<any> {
        return this.http.get('http://localhost:4000/history').map((response: any) => {
            return response.json();
        });
    }

    public getAllTranscationDetails(transcationDetails: any): Observable<any> {
        console.log("Inside the service: ", transcationDetails)
        let body = {
            "quantity": transcationDetails.quantity,
            "xrpPerBuyingPrice": transcationDetails.xrpPerBuyingPrice,
            "totalBuyingCost": 0,
            "profit": transcationDetails.profit,
            "totalSellingcost": 0,
            "xrpPerSellingPrice": 0
        };
        return this.http.post('http://localhost:4000/xrp', body).map((response: any) => {
            console.log("response:",response.json());
            return response.json();
        });
    }

}