import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { KhamphaComponent } from './pages/user/khampha/khampha.component';
import { ZingchartComponent } from './pages/user/zingchart/zingchart.component';
import { HomeComponent } from './pages/user/home/home.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { EditProductComponent } from './pages/admin/edit-product/edit-product.component';
import { LoginComponent } from './components/user/header/component/login/login.component';
import { Top10Component } from './pages/user/top10/top10.component';
import { MvComponent } from './pages/user/mv/mv.component';
import { NewsongComponent } from './pages/user/newsong/newsong.component';
import { ListUserComponent } from './pages/admin/list-user/list-user.component';
import { ListMusicComponent } from './pages/admin/list-music/list-music.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { LoadPlaylistComponent } from './pages/user/load-playlist/load-playlist.component';
import { DiscoveryCategoryComponent } from './pages/user/discovery-category/discovery-category.component';



const routes: Routes = [
  {
    path: '', component: BaseLayoutComponent, children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      {
        path: "khampha", component: KhamphaComponent
      },
      {
        path: "zingchart", component: ZingchartComponent
      },
      { path: "top10", component: Top10Component },
      { path: "playlist/:id", component: LoadPlaylistComponent },
      { path: "mv", component: MvComponent },
      { path: "discovery/:id", component: DiscoveryCategoryComponent },
      { path: "newsong", component: NewsongComponent },

    ]

  },
  { path: "login", component: LoginComponent },
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: "user", component: ListUserComponent },
      { path: "music", component: ListMusicComponent },
      { path: "category", component: CategoryComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
