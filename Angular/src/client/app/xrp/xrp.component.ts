import { Component } from '@angular/core';
import { XrpService } from './shared/xrp.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TranscationDetails } from './Xrp/transcationDetails';
import { AverageDetails } from './Xrp/averageDetails';
import { PaginatorModule } from 'primeng/primeng';
import { Car } from './Details';

/**
 * This class represents the lazy  loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'xrp.component.html',
  styleUrls: ['xrp.component.css']
})
export class XRPComponent {
  public checkbox1: boolean = false;
  public checkbox2: boolean = false;
  public checkbox3: boolean = false;
  public data: any;
  public buyingHistory: any;
  public transcationDetails: TranscationDetails = <TranscationDetails>{};
  public responseTranscationDetails: TranscationDetails = <TranscationDetails>{};
  public isPriceChecked: boolean = false;
  public isAverageChecked: boolean = true;
  public avgQuantity: number = 0;
  public avgPrice: number = 0;
  public avgdetails: Array<AverageDetails> = [];
  public displayAvgDetails: Array<AverageDetails> = [];
  public totalCost: number = 0;
  public totalQuantity: number = 0;
  public average: number = 0;
  public date: Date = new Date();
  enableDatepicker: boolean = false;
  filterText: string = '';
   availableList = [
    { name: 'OptionA', value: '1', checked: false },
    { name: 'OptionB', value: '2', checked: false },
    { name: 'OptionC', value: '3', checked: false }
  ];
  allAvailableList = this.availableList;
  //   { name: 'OptionA', value: '1', checked: false },
  //   { name: 'OptionB', value: '2', checked: false },
  //   { name: 'OptionC', value: '3', checked: false }
  // ];
  public selectedList: any = [];
  options = {
    responsive: false,
    maintainAspectRatio: false,
  };
  date2: Date = new Date();
  cars: any[];
  constructor(private xrpservice: XrpService, private router: Router) {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Average Chart',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
      ]
    };
  }
  /**
   * On page Load-
   * 1.Get the previous transaction details from the localStorage
   * 2.Calculate the Average
   * @memberof XRPComponent
   */
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.getHistory();
    localStorage.setItem('totalCost', String(0));
    localStorage.setItem('totalQuantity', String(0));
    this.getlocalStorage('avg');
    this.getAverage(true);
  }
  public additems(checkboxvalue: any, index: any) {
    this.selectedList.push(checkboxvalue);
    this.availableList.splice(index, 1);
    this.availableList.sort();
    this.selectedList.sort();
  }
  public removeitems(checkboxvalue: any, index: any) {
    this.availableList.push(checkboxvalue);
    this.selectedList.splice(index, 1);
    this.availableList.sort();
    this.selectedList.sort();
  }
  public doSomething(searchText: string) {
    // let searchedList = [];
    // for (let name in this.allAvailableList){
    //   if (this.allAvailableList[name].includes(searchText.toLowerCase())) {
    //     searchedList.push(this.allAvailableList[name]);
    //   }
    //}
    // if (searchText === '') {
    //   this.availableList = this.allAvailableList;
    // }
    //this.availableList = searchedList;
  }
  public getlocalStorage(key: string) {
    this.displayAvgDetails = Object.assign([], JSON.parse(localStorage.getItem(key)));
  }
  public writeToLocalStorage(key: string) {

    localStorage.setItem(key, JSON.stringify(this.avgdetails));
    console.log(key + ':', localStorage.getItem(key));
  }
  public getHistory() {
    this.xrpservice.getHistory().subscribe(history => {
      console.log('response: ', history);
      this.buyingHistory = history;
      this.buyingHistory=this.buyingHistory.json();
      console.log(this.buyingHistory.password);
    });
  }
  public getTranscationDetails() {
    console.log('Inside the getAllTranscationDetails method');
    this.transcationDetails.totalBuyingCost = 0;
    this.transcationDetails.totalSellingcost = 0;
    this.transcationDetails.xrpPerSellingPrice = 0;
    console.log('transcation object:', this.transcationDetails);
    this.xrpservice.getAllTranscationDetails(this.transcationDetails).subscribe(details => {
      console.log('response a: ', details);
      this.responseTranscationDetails = Object.assign({}, details);
    });
  }
  public authentication() {
    console.log('Inside the authentication method');
    console.log(this.transcationDetails.quantity, this.transcationDetails.xrpPerBuyingPrice, this.transcationDetails.profit);
  }
  public changeRadio(value: boolean) {
    console.log('check box'+value);

    if (value === true) {
      this.isAverageChecked = true;
      this.isPriceChecked = false;

    }else {
      this.isAverageChecked = false;
      this.isPriceChecked = true;

    }
    this.enableDatepicker === true ? this.enableDatepicker = false : this.enableDatepicker = true;
    console.log(this.date);

  }
  public getAverage(onPageLoad: boolean) {
    if (onPageLoad) {
      for (let details of this.avgdetails) {
        this.totalCost += (details.price * details.quantity);
        this.totalQuantity += details.quantity;
      }
      localStorage.setItem('totalCost', String(this.totalCost));
      localStorage.setItem('totalQuantity', String(this.totalQuantity));

    }else {
      this.totalCost = Number(localStorage.getItem('totalCost'));
      console.log(this.avgQuantity, this.avgPrice);
      console.log(this.totalCost, this.totalQuantity);

      this.totalCost += (this.avgQuantity * this.avgPrice);
      localStorage.setItem('totalCost', String(this.totalCost));
      this.totalQuantity = Number(localStorage.getItem('totalQuantity'));
      this.totalQuantity += this.avgQuantity;
      localStorage.setItem('totalQuantity', String(this.totalQuantity));
      this.average = Number((this.totalCost / this.totalQuantity).toFixed(2));
      //this.average.isNan()
    }
  }
  public add() {
    this.avgdetails = Object.assign([], JSON.parse(localStorage.getItem('avg')));
    this.avgdetails.push(new AverageDetails(this.avgQuantity, this.avgPrice));
    console.log(this.avgdetails);
    this.getAverage(false);
    this.avgQuantity = 0;
    this.avgPrice = 0;
    console.log(JSON.stringify(this.avgdetails));
    this.writeToLocalStorage('avg');
    this.getlocalStorage('avg');
    this.data.datasets[0].data.push(45);
    console.log(this.data.datasets[0].data);
  }



  public reset() {
    console.log('Reset');
    let decision = alert('Wo Teri bhens ki aankh---Do you want to remove the all the transcation---');
    console.log(decision);

    localStorage.removeItem('avg');
    localStorage.removeItem('totalCost');
    localStorage.removeItem('totalQuantity');
    location.reload();
  }

}
