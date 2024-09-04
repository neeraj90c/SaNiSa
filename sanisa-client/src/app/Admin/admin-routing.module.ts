import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import { ItemMasterComponent } from './item-master/item-master.component';
import { ComboMasterComponent } from './combo-master/combo-master.component';

const routes: Routes = [
  {
    
    path: '', component: NavbarComponent, children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path:'users', component:UsersComponent, title:'Users'},
      { path:'products', component:ItemMasterComponent, title:'Products'},
      { path:'combo', component:ComboMasterComponent, title:'Combo'}
    ], title : 'Admin'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
