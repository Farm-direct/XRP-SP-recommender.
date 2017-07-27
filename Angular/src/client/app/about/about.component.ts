import { Component } from '@angular/core';
import { AboutService } from './shared/about.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent {
  constructor(private aboutservice: AboutService,private router:Router ) {

  }
  public buyingHistory: any;
  public userName: any;
  public password: any;
  
  ngOnInit(): void {
    this.getHistory();
  }
  public getHistory() {
  
    this.aboutservice.getHistory().subscribe(history => {
      console.log("response: ",history);
      this.buyingHistory = history;
      console.log(this.buyingHistory.password);
      if (this.userName == this.buyingHistory.username && this.password == this.buyingHistory.password)
       {
        this.router.navigate([`/`]);
        }
    });
  }
  public authentication() {
    if (this.userName == 'asd' && this.password == 'qwe') {
      console.log(this.userName + " and password: " + this.password);
      this.router.navigate([`/`]);
      
    }
    else {
      this.router.navigate([`/`])
    }
  }
 }
