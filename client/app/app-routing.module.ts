import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { TosComponent } from './tos/tos.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { ClaimComponent } from './claim/claim.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'users',
        component: UsersComponent,
    },
    {
        path: 'tos',
        component: TosComponent,
    },
    {
        path: 'privacypolicy',
        component: PrivacypolicyComponent,
    },
    {
        path: 'claim',
        component: ClaimComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
