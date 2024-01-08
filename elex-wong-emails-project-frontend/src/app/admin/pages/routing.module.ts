import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDevToolsComponent } from './devtools/devtools.component';
import { AdminERC20airdropsComponent } from './erc20airdrops/erc20airdrops.component';
import { AdminHomeComponent } from './home/home.component';
import { AdminModule } from './module';
import { AdminWalletComponent } from './wallet/wallet.component';

const routes: Routes = [
  { path: 'home', component: AdminHomeComponent },
  { path: 'erc20airdrops', component: AdminERC20airdropsComponent },
  { path: 'wallet', component: AdminWalletComponent },
  { path: 'devtools', component: AdminDevToolsComponent }
];

@NgModule({
  imports: [
    AdminModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
