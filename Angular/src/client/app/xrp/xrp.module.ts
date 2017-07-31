import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XRPComponent } from './xrp.component';
import { XrpRoutingModule } from './xrp-routing.module';
import { XrpService } from './shared/xrp.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, XrpRoutingModule,FormsModule],
  declarations: [XRPComponent],
  exports: [XRPComponent],
  providers: [XrpService]
})
export class XrpModule { }
