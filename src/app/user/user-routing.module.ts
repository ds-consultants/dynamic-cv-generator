import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserResolver } from './user-resolver.module';

const routes: Routes = [
  {
    path: ':id',
    component: UserComponent,
    resolve: {
      user: UserResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
