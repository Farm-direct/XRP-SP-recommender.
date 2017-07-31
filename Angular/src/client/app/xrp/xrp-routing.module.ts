import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XRPComponent } from './xrp.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'xrp', component: XRPComponent }
    ])
  ],
  exports: [RouterModule]
})
export class XrpRoutingModule { }
