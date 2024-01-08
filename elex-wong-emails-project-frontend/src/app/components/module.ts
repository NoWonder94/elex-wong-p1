import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwappingSquaresSpinnerModule } from 'angular-epic-spinners';
import { ButtonLoaderComponent } from './btn-loader/btn-loader';
import { ConnectWalletComponent } from './connect-wallet/connect-wallet.component';
import { DataIsLoadingComponent } from './data-is-loading/data-is-loading.component';
import { AppFooterComponent } from './footer/footer.component';
import { AppHeaderComponent } from './header/header.component';
import { RegularAccountSignupComponent } from './reg-account-signup/reg-account-signup.component';
import { SimpleBoxEditComponent } from './simple-box-edit/simple-box-edit.component';
import { WalletSignInComponent } from './wallet-sign-in/wallet-sign-in.component';

@NgModule({
  declarations: [
    AppHeaderComponent,
    AppFooterComponent,
    ButtonLoaderComponent,
    ConnectWalletComponent,
    WalletSignInComponent,
    RegularAccountSignupComponent,
    SimpleBoxEditComponent,
    DataIsLoadingComponent
  ],
  exports: [
    AppHeaderComponent,
    AppFooterComponent,
    ButtonLoaderComponent,
    ConnectWalletComponent,
    WalletSignInComponent,
    RegularAccountSignupComponent,
    SimpleBoxEditComponent,
    DataIsLoadingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SwappingSquaresSpinnerModule
  ],
  providers: [
  ],
  bootstrap: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
