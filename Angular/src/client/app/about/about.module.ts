import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { AboutService } from './shared/about.service';

@NgModule({
  imports: [CommonModule, AboutRoutingModule],
  declarations: [AboutComponent],
  exports: [AboutComponent],
  providers: [AboutService]
})
export class AboutModule { }
