import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './core/auth/auth.guard';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { UsersDataBackupComponent } from './users-data-backup/users-data-backup.component';

const routes: Routes = [
    { path: 'login', component: UserLoginComponent },
    { path: 'signup', component: UserSignUpComponent },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'backup/:auth', component: UsersDataBackupComponent },
    {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    },
    {
        path: 'user/:uid',
        loadChildren: './user/user.module#UserModule'
    },
    {
        path: '',
        redirectTo: '/user/settings',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
