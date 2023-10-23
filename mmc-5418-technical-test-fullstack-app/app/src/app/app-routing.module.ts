import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminDataResolver as AdminDataResolver } from './admin/admin.resolver';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/routing-guard';
import { LoginComponent } from './login/login.component';
import { UserDataResolver } from './user/user.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        resolve: { userInfo: AdminDataResolver }
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        resolve: { userInfo: UserDataResolver }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
