import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from 'src/app/components/module';


import { EmailCommunicationComponent } from './email-communication.component';

@NgModule({
  declarations: [EmailCommunicationComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: EmailCommunicationComponent }])
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmailCommunicationModule { }
