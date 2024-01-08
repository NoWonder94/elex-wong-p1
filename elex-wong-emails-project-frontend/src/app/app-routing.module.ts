import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import { CampaignComponent } from './pages/campaign/campaign.component';
import { ConnectComponent } from './pages/connect/connect.component';
import { CreateCampaignComponent } from './pages/create-campaign/create-campaign.component';
import { DiscordCallbackComponent } from './pages/discord-cb/discord-cb.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectComponent } from './pages/project/project.component';
import { RefCodeLandingComponent } from './pages/ref-code-landing/ref-code-landing.component';
import { TokenComponent } from './pages/token/token.component';
import { TwitterCallbackComponent } from './pages/twitter-cb/twitter-cb.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

// Example of legacy url to support: https://emails.com/register/index.html?refercode=1D775
const routes: Routes = [
  { path: 'connect', component: ConnectComponent },
  { path: 'account-info', component: AccountInfoComponent/* , canActivate: [AuthGuardService] */ },
  { path: 'project/:projectId', component: ProjectComponent },
  { path: 'project/:projectId/create-campaign', component: CreateCampaignComponent },
  { path: 'project/:projectId/campaign/:campaignId', component: CampaignComponent },
  { path: 'project/:projectId/token/:tokenId', component: TokenComponent },
  { path: 'project/:projectId/emailtemplate/:templateId', loadChildren: () => import("./pages/email-template/module").then(m => m.EmailTemplateModule) },
  { path: 'project/:projectId/emailcommunication/:emailingId', loadChildren: () => import("./pages/email-communication/module").then(m => m.EmailCommunicationModule) },
  { path: 'r/:refCode', component: RefCodeLandingComponent },
  { path: 'twitter/returned', component: TwitterCallbackComponent },
  { path: 'discord/returned', component: DiscordCallbackComponent },
  { path: 'verifyemail', component: VerifyEmailComponent },

  // Legacy url support
  { path: 'register', component: RefCodeLandingComponent },
  { path: 'register/index.html', component: RefCodeLandingComponent },

  { path: 'admin', loadChildren: () => import('./admin/pages/routing.module').then(m => m.AdminRoutingModule) },

  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
