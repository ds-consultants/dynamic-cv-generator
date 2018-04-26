import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserResolver } from './user-resolver.module';
import { AuthGuard } from '../core/auth/auth.guard';
import { UserSettingsComponent } from '../user-settings/user-settings.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: UserComponent,
        resolve: {
            user: UserResolver
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        component: UserSettingsComponent,
        resolve: {
            user: UserResolver
        },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
