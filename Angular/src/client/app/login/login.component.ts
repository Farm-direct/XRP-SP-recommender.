import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Dropdown } from 'primeng/primeng';
import { Car } from './Details';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    cars: Car[];
    value = '';
    onEnter(value: string) {
    this.value = value;
    console.log(this.value);
    }}
