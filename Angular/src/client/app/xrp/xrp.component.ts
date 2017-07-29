import { Component } from '@angular/core';
import { XrpService } from './shared/xrp.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TranscationDetails } from './Xrp/transcationDetails';
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
  

  ngOnInit(): void {
    this.getHistory();
    this.getTranscationDetails();
  }
  public getHistory() {

    this.xrpservice.getHistory().subscribe(history => {
      console.log("response: ", history);
      this.buyingHistory = history;
      console.log(this.buyingHistory.password);
      // if (this.userName == this.buyingHistory.username && this.password == this.buyingHistory.password) {
      //   this.router.navigate([`/`]);
      // }
    });
  }
  public getTranscationDetails() {
    console.log("Inside the getAllTranscationDetails method")
    this.transcationDetails.totalBuyingCost = 0;
    this.transcationDetails.totalSellingcost = 0;
    this.transcationDetails.xrpPerSellingPrice = 0;
    console.log("transcation object:",this.transcationDetails);
    this.xrpservice.getAllTranscationDetails(this.transcationDetails).subscribe(details => {
      console.log("response: ", details);
      this.responseTranscationDetails = Object.assign({}, details);;
      //console.log(this.transcationDetails1);
      // if (this.userName == this.buyingHistory.username && this.password == this.buyingHistory.password) {
      //   this.router.navigate([`/`]);
      // }
    });
  }
  public authentication() {
    console.log("Inside the authentication method");
    console.log(this.transcationDetails.quantity,this.transcationDetails.xrpPerBuyingPrice,this.transcationDetails.profit)
    // if (this.userName == 'asd' && this.password == 'qwe') {
    //   console.log(this.userName + " and password: " + this.password);
    //   this.router.navigate([`/`]);

    // }
    // else {
    //   this.router.navigate([`/`])
    // }
  }
}
