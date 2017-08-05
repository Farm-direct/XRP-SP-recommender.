import { Component } from '@angular/core';
import { XrpService } from './shared/xrp.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TranscationDetails } from './Xrp/transcationDetails';
import { AverageDetails } from './Xrp/averageDetails';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'xrp.component.html',
  styleUrls: ['xrp.component.css']
})
export class XRPComponent {
  constructor(private xrpservice: XrpService, private router: Router) {

  }
  public buyingHistory: any;
  public transcationDetails: TranscationDetails = <TranscationDetails>{}
  public responseTranscationDetails: TranscationDetails = <TranscationDetails>{}
  public isPriceChecked: boolean = false;
  public isAverageChecked: boolean = true;
  public avgQuantity: number;
  public avgPrice: number;
  public avgdetails: Array<AverageDetails> = []
  public displayAvgDetails: Array<AverageDetails> = []
  public totalCost: number = 0;
  public totalQuantity: number = 0;
  public average: number = 0;


  ngOnInit(): void {
    this.getHistory();
  }
  public getHistory() {

    this.xrpservice.getHistory().subscribe(history => {
      console.log("response: ", history);
      this.buyingHistory = history;
      console.log(this.buyingHistory.password);
    });
  }
  public getTranscationDetails() {
    console.log("Inside the getAllTranscationDetails method")
    this.transcationDetails.totalBuyingCost = 0;
    this.transcationDetails.totalSellingcost = 0;
    this.transcationDetails.xrpPerSellingPrice = 0;
    console.log("transcation object:", this.transcationDetails);
    this.xrpservice.getAllTranscationDetails(this.transcationDetails).subscribe(details => {
      console.log("response a: ", details);
      this.responseTranscationDetails = Object.assign({}, details);;
    });
  }
  public authentication() {
    console.log("Inside the authentication method");
    console.log(this.transcationDetails.quantity, this.transcationDetails.xrpPerBuyingPrice, this.transcationDetails.profit)
  }
  public changeRadio(value: boolean) {
    console.log(value);

    if (value == true) {
      this.isAverageChecked = true;
      this.isPriceChecked = false;
    }
    else {
      this.isAverageChecked = false;
      this.isPriceChecked = true;
    }
  }
  public add() {
    this.totalCost += this.avgPrice;
    this.totalQuantity += this.avgQuantity;
    this.avgdetails.push(new AverageDetails(this.avgQuantity, this.avgPrice))
    console.log(this.avgdetails);
    this.avgQuantity = 0;
    this.avgPrice = 0;
    console.log(JSON.stringify(this.avgdetails));
    localStorage.setItem("avg", JSON.stringify(this.avgdetails))
    console.log("avg:",localStorage.getItem("avg"));


    //for (let entry of ) {
    //console.log(entry); // 1, "string", false
  }
  // localStorage.setItem();
  // //localStorage.setItem("quantity", "5");
  // console.log("Add:",localStorage.getItem());


  public reset() {
    console.log("Reset");
  }
  public submit() {
    console.log("submit");
    
    
    // for (let details of this.avgdetails) {
    //   localStorage.setItem("quantity", String(details.quantity))
    // }   
    //console.log("Add:", localStorage.getItem("avg"));
    /*console.log("After parsing:", JSON.parse(localStorage.getItem("avg")));
    this.displayAvgDetails = Object.assign([], JSON.parse(localStorage.getItem("avg")))

    this.average = Number((this.totalCost / this.totalQuantity).toFixed(2));
    localStorage.setItem("AvgNew", JSON.stringify({ quantity: this.avgQuantity, price: this.avgPrice }))
    localStorage.setItem("Random", "random");
    localStorage.setItem("random", "random1");
    this.setobj("avgNew", this.avgdetails);


    //alert(localStorage.getItem("Random"))
    //alert(localStorage.getItem("random"))
    console.log("getobj",
      (this.getobj("avgNew")))
    let avgjson = {"quantity":0,"price":0}
    avgjson["quantity"] = this.avgQuantity;
    avgjson["price"] = this.avgPrice
    console.log("json",JSON.stringify(avgjson));
    localStorage.setItem("json", JSON.stringify(this.avgdetails))
    
    this.displayAvgDetails = Object.assign([], JSON.parse(localStorage.getItem("json")))
    console.log(this.displayAvgDetails);
    
    alert(this.displayAvgDetails)*/
  }
  public setobj(key: any, obj: any) {
    Storage.prototype.setObj = function () {
      return this.setItem(key, JSON.stringify(obj))
    }

  }
  public getobj(key: any): any {
    Storage.prototype.getObj = function () {
      return JSON.parse(this.getItem(key))
    }
  }
}
