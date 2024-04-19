import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/user/home/home.component';
import { SidebarComponent } from './components/user/sidebar/sidebar.component';
import { SidebarModule } from 'ng-cdbangular';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { CanhanComponent } from './pages/user/canhan/canhan.component';
import { ZingchartComponent } from './pages/user/zingchart/zingchart.component';
import { FooterComponent } from './components/user/footer/footer.component';
import { HeaderComponent } from './components/user/header/header.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminFooterComponent } from './components/admin/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { EditProductComponent } from './pages/admin/edit-product/edit-product.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { AddplayListComponent } from './components/user/addplay-list/addplay-list.component';
import { AddHoiVienComponent } from './components/user/add-hoi-vien/add-hoi-vien.component';
import { GioithieuComponent } from './components/user/gioithieu/gioithieu.component';
import { SearchComponent } from './components/user/header/component/search/search.component';
import { AvatarModule } from 'ngx-avatar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDropdown, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InforUserComponent } from './components/user/header/component/infor-user/infor-user.component';
import { LoginComponent } from './components/user/header/component/login/login.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Top10Component } from './pages/user/top10/top10.component';
import { MvComponent } from './pages/user/mv/mv.component';
import { NewsongComponent } from './pages/user/newsong/newsong.component';
// decorators
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    NewsongComponent,
    BaseLayoutComponent,
    BaseLayoutComponent,
    ZingchartComponent,
    FooterComponent,
    LoginComponent,
    HeaderComponent,
    AdminLayoutComponent,
    DashboardComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    AdminHeaderComponent,
    AddProductComponent,
    EditProductComponent,
    AddplayListComponent,
    AddHoiVienComponent,
    GioithieuComponent,
    SearchComponent,
    InforUserComponent,
    Top10Component,
    MvComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    SidebarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    AvatarModule,
    NgbModule,
    NgbDropdownModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    NgxChartsModule
  ],
  providers: [NgbDropdown],
  bootstrap: [AppComponent]
})
export class AppModule { }
