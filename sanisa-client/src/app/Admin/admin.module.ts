import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ItemMasterComponent } from './item-master/item-master.component';
import { ComboMasterComponent } from './combo-master/combo-master.component';
import { ComboDetailComponent } from './combo-master/combo-detail/combo-detail.component';


@NgModule({
  declarations: [
    NavbarComponent,
    UsersComponent,
    ItemMasterComponent,
    ComboMasterComponent,
    ComboDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
