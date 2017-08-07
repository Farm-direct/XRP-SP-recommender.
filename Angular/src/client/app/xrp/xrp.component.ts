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
  public avgQuantity: number = 0;
  public avgPrice: number=0;
  public avgdetails: Array<AverageDetails> = []
  public displayAvgDetails: Array<AverageDetails> = []
  public totalCost: number = 0;
  public totalQuantity: number = 0;
  public average: number = 0;

  /**
   * On page Load-
   * 1.Get the previous transaction details from the localStorage
   * 2.Calculate the Average
   * 
   * @memberof XRPComponent
   */
  ngOnInit(): void {
    this.getHistory();
    localStorage.setItem("totalCost", String(0))
    localStorage.setItem("totalQuantity", String(0))
    this.getlocalStorage("avg");
    this.getAverage(true);
  }
  public getlocalStorage(key: string) {
    this.displayAvgDetails = Object.assign([], JSON.parse(localStorage.getItem(key)))
  }
  public writeToLocalStorage(key: string) {

    localStorage.setItem(key, JSON.stringify(this.avgdetails))
    console.log(key + ":", localStorage.getItem(key));
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
  public getAverage(onPageLoad: boolean) {
    if (onPageLoad) {
      for (let details of this.avgdetails) {
        this.totalCost += (details.price * details.quantity)
        this.totalQuantity+=details.quantity
      }
      localStorage.setItem("totalCost", String(this.totalCost))
      localStorage.setItem("totalQuantity", String(this.totalQuantity))

    }
    else 
    {
      this.totalCost = Number(localStorage.getItem("totalCost"));
      console.log(this.avgQuantity,this.avgPrice);
      console.log(this.totalCost,this.totalQuantity);
      
      this.totalCost += (this.avgQuantity * this.avgPrice);
      localStorage.setItem("totalCost", String(this.totalCost))
      this.totalQuantity = Number(localStorage.getItem("totalQuantity"));
      this.totalQuantity += this.avgQuantity;
      localStorage.setItem("totalQuantity", String(this.totalQuantity))
      this.average = Number((this.totalCost / this.totalQuantity).toFixed(2));
      //this.average.isNan()
    }
  }
  public add() {
    this.avgdetails = Object.assign([], JSON.parse(localStorage.getItem("avg")))
    this.avgdetails.push(new AverageDetails(this.avgQuantity, this.avgPrice))
    console.log(this.avgdetails);
    this.getAverage(false);
    this.avgQuantity = 0;
    this.avgPrice = 0;
    console.log(JSON.stringify(this.avgdetails));
    this.writeToLocalStorage("avg");
    this.getlocalStorage("avg");
  }



  public reset() {
    console.log("Reset");
    let decision = alert("Wo Teri bhens ki aankh---Do you want to remove the all the transcation---")
    console.log(decision);

    localStorage.removeItem("avg")
    localStorage.removeItem("totalCost")
    localStorage.removeItem("totalQuantity")
    location.reload();
  }

}
