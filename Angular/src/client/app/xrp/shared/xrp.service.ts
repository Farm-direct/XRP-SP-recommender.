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
        //let body =JSON.stringify(transcationDetails);
        let body={
	"quantity": "11",
     "xrpPerBuyingPrice": "10",
     "totalBuyingCost": "0",
     "profit": "50",
     "totalSellingcost": "0",
    "xrpPerSellingPrice": "0"
}
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options=new RequestOptions({body:body})
        //let options = new RequestOptions({ headers: headers });
        /*let body = {
            "quantity": "1",
            "xrpPerBuyingPrice": "2",
            "totalBuyingCost": "0",
            "profit": "3",
            "totalSellingcost": "0",
            "xrpPerSellingPrice": "0"
        };*/
        //let body = Object.assign({}, transcationDetails);
       console.log("Before stringfy body:", body)
        //body = JSON.stringify(body);
        console.log("After Strngfy body:", body)
        return this.http.post('http://localhost:4000/xrp',body,options).map((response: any) => {
            return response;
        });
    }

}