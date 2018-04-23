import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './core/auth/auth.guard';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: UserLoginComponent },
    { path: 'signup', component: UserSignUpComponent },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    {
        path: 'dashboard',
        loadChildren: './user/user.module#UserModule'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
