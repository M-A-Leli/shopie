import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './features/home/home.component';
import { ProductComponent } from './features/product/product.component';
import { UserManagementComponent } from './features/admin-dashboard/user-management/user-management.component';
import { DashboardComponent } from './features/admin-dashboard/dashboard/dashboard.component';
import { ProductManagementComponent } from './features/admin-dashboard/product-management/product-management.component';
import { AdminProfileComponent } from './features/admin-dashboard/admin-profile/admin-profile.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      {path:'profile',component:AdminProfileComponent},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductManagementComponent},
      { path: 'customers', component: UserManagementComponent },

    ]
  },

];
