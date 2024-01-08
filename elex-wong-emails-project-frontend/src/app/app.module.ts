import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { ClipboardModule } from 'ngx-clipboard';
import { LottieModule } from 'ngx-lottie';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/module';
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import { CampaignComponent } from './pages/campaign/campaign.component';
import { CampaignActionEditor } from './pages/campaign/component/action-editor/action-editor.component';
import { ConnectComponent } from './pages/connect/connect.component';
import { CreateCampaignComponent } from './pages/create-campaign/create-campaign.component';
import { DiscordCallbackComponent } from './pages/discord-cb/discord-cb.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectComponent } from './pages/project/project.component';
import { RefCodeLandingComponent } from './pages/ref-code-landing/ref-code-landing.component';
import { TokenComponent } from './pages/token/token.component';
import { TwitterCallbackComponent } from './pages/twitter-cb/twitter-cb.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}
@NgModule({
  declarations: [
    // Pages
    AppComponent,
    HomeComponent,
    AccountInfoComponent,
    ConnectComponent,
    ProjectComponent,
    CreateCampaignComponent,
    CampaignComponent,
    TokenComponent,
    RefCodeLandingComponent,
    TwitterCallbackComponent,
    DiscordCallbackComponent,
    VerifyEmailComponent,

    // Campaign components
    CampaignActionEditor
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClipboardModule,
    ToastrModule.forRoot(),
    NgbModule,
    LottieModule.forRoot({ player: playerFactory }),
    ComponentsModule,
    FilePickerModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
