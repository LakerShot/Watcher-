import { ComputePipe } from './shared/pipes/compute.pipe';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { BrowserModule } from '@angular/platform-browser'
import { NgModule, Provider } from '@angular/core'
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { PositionsFormComponent } from './categories-page/categories-form/positions-form/positions-form.component';
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from './order-page/order-positions/order-positions.component';
import { HistoryListComponent } from './history-page/history-list/history-list.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: TokenInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    LoaderComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    HistoryListComponent,
    HistoryFilterComponent,
    ComputePipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }