import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
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
import { CategoryComponent } from './pages/admin/category/category.component';
import { ListUserComponent } from './pages/admin/list-user/list-user.component';
import { ListMusicComponent } from './pages/admin/list-music/list-music.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { NgPagination } from './components/paginator/ng-pagination/ng-pagination.component';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ActionNotificationComponent } from './components/crud/action-natification/action-notification.component';
import { LayoutUtilsService } from './components/crud/utils/layout-utils.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteEntityDialogComponent } from './components/crud';
import { MatRadioModule } from '@angular/material/radio';
import { AddMusicComponent } from './pages/admin/list-music/add-music/add-music.component';
import { LoadPlaylistComponent } from './pages/user/load-playlist/load-playlist.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { KhamphaComponent } from './pages/user/khampha/khampha.component';
import { DiscoveryCategoryComponent } from './pages/user/discovery-category/discovery-category.component';
import { AddSongPlaylistComponent } from './pages/user/add-song-playlist/add-song-playlist.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DetailPlaySongComponent } from './pages/user/detail-play-song/detail-play-song.component';
import { UpdateSongComponent } from './pages/admin/list-music/update-song/update-song.component';
import { HomeComponent } from './pages/user/home/home.component';
import { SuccessComponent } from './pages/user/success/success.component';
import { RadioComponent } from './pages/user/radio/radio.component';
import { LoadRadioComponent } from './pages/admin/load-radio/load-radio.component';
import { AddRadioComponent } from './pages/admin/add-radio/add-radio.component';
import { ChangePassComponent } from './components/user/header/component/change-pass/change-pass.component';
import { LoadPlaylistLikeComponent } from './components/user/header/component/load-playlist-like/load-playlist-like.component';
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
    ActionNotificationComponent,
    HeaderComponent,
    AdminLayoutComponent,
    DashboardComponent,
    DeleteEntityDialogComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    AdminHeaderComponent,
    EditProductComponent,
    AddplayListComponent,
    AddHoiVienComponent,
    GioithieuComponent,
    SearchComponent,
    InforUserComponent,
    Top10Component,
    MvComponent,
    KhamphaComponent,
    CategoryComponent,
    ListUserComponent,
    ListMusicComponent,
    PaginatorComponent,
    NgPagination,
    AddCategoryComponent,
    AddMusicComponent,
    LoadPlaylistComponent,
    UpdateCategoryComponent,
    DiscoveryCategoryComponent,
    AddSongPlaylistComponent,
    DetailPlaySongComponent,
    UpdateSongComponent,
    SuccessComponent,
    RadioComponent,
    LoadRadioComponent,
    AddRadioComponent,
    ChangePassComponent,
    LoadPlaylistLikeComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatInputModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    CommonModule,
    MatRadioModule,
    SidebarModule,
    NgScrollbarModule,
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
    NgxChartsModule,
    MatSnackBarModule
  ],
  providers: [NgbDropdown, LayoutUtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }