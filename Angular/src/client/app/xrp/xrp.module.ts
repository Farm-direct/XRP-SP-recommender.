import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XRPComponent } from './xrp.component';
import { XrpRoutingModule } from './xrp-routing.module';
import { XrpService } from './shared/xrp.service';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';

@NgModule({
  imports: [DataGridModule, DataTableModule, CommonModule, XrpRoutingModule
    , FormsModule, CalendarModule, ChartModule, PaginatorModule, PickListModule],
  declarations: [XRPComponent],
  exports: [XRPComponent],
  providers: [XrpService]
})
export class XrpModule { }
