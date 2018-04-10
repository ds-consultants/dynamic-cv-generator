import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full'},
  { path: 'user/:id', component: UserComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
