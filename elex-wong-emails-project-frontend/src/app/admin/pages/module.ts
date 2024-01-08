import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { ClipboardModule } from 'ngx-clipboard';
import { LottieModule } from 'ngx-lottie';
import { ToastrModule } from 'ngx-toastr';
import { ComponentsModule } from 'src/app/components/module';
import { AdminDevToolsComponent } from './devtools/devtools.component';
import { AdminERC20airdropsComponent } from './erc20airdrops/erc20airdrops.component';
import { AdminHomeComponent } from './home/home.component';
import { AdminWalletComponent } from './wallet/wallet.component';

@NgModule({
  declarations: [
    // Pages
    AdminHomeComponent,
    AdminERC20airdropsComponent,
    AdminWalletComponent,
    AdminDevToolsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,
    ToastrModule,
    NgbModule,
    LottieModule,
    ComponentsModule,
    FilePickerModule
  ],
  providers: [
  ],
  bootstrap: [
  ]
})
export class AdminModule { }
