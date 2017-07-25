import { Component } from '@angular/core';
import { AboutService } from './shared/about.service';

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
  constructor(private aboutservice: AboutService) {

  }
  public buyingHistory: any;
  
  ngOnInit(): void {
    this.getHistory();
  }
  public getHistory() {
  
    this.aboutservice.getHistory().subscribe(history => {
      console.log("response: ",history);
      this.buyingHistory = history;
    });
  }
 }
