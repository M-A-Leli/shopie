import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { AdminLogoutComponent } from './features/admin-dashboard/admin-logout/admin-logout.component';
import { AdminProfileComponent } from './features/admin-dashboard/admin-profile/admin-profile.component';
import { CategoryManagementComponent } from './features/admin-dashboard/category-management/category-management.component';
import { DashboardComponent } from './features/admin-dashboard/dashboard/dashboard.component';
import { ProductManagementComponent } from './features/admin-dashboard/product-management/product-management.component';
import { UserManagementComponent } from './features/admin-dashboard/user-management/user-management.component';
import { CartItemComponent } from './features/cart-item/cart-item.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { PasswordResetComponent } from './features/password-reset/password-reset.component';
import { ProductComponent } from './features/product/product.component';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { SingleProductComponent } from './features/product/single-product/single-product.component';
import { RegisterComponent } from './features/register/register.component';
import { ResetCodeVerificationComponent } from './features/reset-code-verification/reset-code-verification.component';
import { UserDashboardComponent } from './features/user-dashboard/user-dashboard.component';
import { UserCartComponent } from './features/user-dashboard/user-cart/user-cart.component';
import { UserLogoutComponent } from './features/user-dashboard/user-logout/user-logout.component';
import { UserOrdersComponent } from './features/user-dashboard/user-orders/user-orders.component';
import { UserProfileComponent } from './features/user-dashboard/user-profile/user-profile.component';
import { UserProductsComponent } from './features/user-dashboard/user-products/user-products.component';
import { ViewSingleComponent } from './features/admin-dashboard/view-single/view-single.component';
import { OrderManagementComponent } from './features/admin-dashboard/order-management/order-management.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-code/verify', component: ResetCodeVerificationComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'cart', component: CartItemComponent },
  {
    path: 'products', component: ProductComponent, children: [
      { path: ':id', component: SingleProductComponent },
      { path: '', component: ProductListComponent },
    ]
  },
  {
    path: 'user/dashboard', component: UserDashboardComponent, children: [
      { path: 'cart', component: UserCartComponent },
      {path: 'product', component: UserProductsComponent },
      { path: 'logout', component: UserLogoutComponent },
      { path: 'orders', component: UserOrdersComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ]
  },
  {
    path: 'admin', component: AdminDashboardComponent, children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'logout', component: AdminLogoutComponent },
      { path: 'profile', component: AdminProfileComponent, data: { title: 'Profile' } },
      { path: 'categories', component: CategoryManagementComponent, data: { title: 'Categories' } },
      { path: 'products', component: ProductManagementComponent, data: { title: 'Products' } },
      { path: 'products/view/:id', component: ViewSingleComponent },
      { path: 'users', component: UserManagementComponent, data: { title: 'Customers' } },
      { path: 'orders', component: OrderManagementComponent, data: { title: 'Orders' } },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
