import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { ResetCodeVerificationComponent } from './features/reset-code-verification/reset-code-verification.component';
import { PasswordResetComponent } from './features/password-reset/password-reset.component';
import { UserDashboardComponent } from './features/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { ProductComponent } from './features/product/product.component';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { SingleProductComponent } from './features/product/single-product/single-product.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { CartItemComponent } from './features/cart-item/cart-item.component';
import { AdminLogoutComponent } from './features/admin-dashboard/admin-logout/admin-logout.component';
import { AdminProfileComponent } from './features/admin-dashboard/admin-profile/admin-profile.component';
import { CategoryManagementComponent } from './features/admin-dashboard/category-management/category-management.component';
import { ProductManagementComponent } from './features/admin-dashboard/product-management/product-management.component';
import { UserManagementComponent } from './features/admin-dashboard/user-management/user-management.component';
import { UserCartComponent } from './features/user-dashboard/user-cart/user-cart.component';
import { UserLogoutComponent } from './features/user-dashboard/user-logout/user-logout.component';
import { UserOrdersComponent } from './features/user-dashboard/user-orders/user-orders.component';
import { UserProfileComponent } from './features/user-dashboard/user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-code/verify', component: ResetCodeVerificationComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'cart', component: CartItemComponent },
  {path: 'user-dashboard', component: UserDashboardComponent},
  {
    path: 'products', component: ProductComponent, children: [
      { path: ':id', component: SingleProductComponent },
      { path: '', component: ProductListComponent },
    ]
  },
  {
    path: 'user/dashboard', component: UserDashboardComponent, children: [
      { path: 'cart', component:  UserCartComponent},
      { path: 'logout', component: UserLogoutComponent },
      { path: 'orders', component: UserOrdersComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin/dashboard', component: AdminDashboardComponent, children: [
      { path: 'logout', component: AdminLogoutComponent },
      { path: 'profile', component: AdminProfileComponent },
      { path: 'categories', component: CategoryManagementComponent },
      { path: 'products', component: ProductManagementComponent },
      { path: 'users', component: UserManagementComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
