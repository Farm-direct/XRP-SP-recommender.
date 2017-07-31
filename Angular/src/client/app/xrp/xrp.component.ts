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
    console.log("transcation object:",this.transcationDetails);
    this.xrpservice.getAllTranscationDetails(this.transcationDetails).subscribe(details => {
      console.log("response a: ", details);
      this.responseTranscationDetails = Object.assign({}, details);;
    });
  }
  public authentication() {
    console.log("Inside the authentication method");
    console.log(this.transcationDetails.quantity,this.transcationDetails.xrpPerBuyingPrice,this.transcationDetails.profit)
  }
}
