import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmailEditorModule } from 'angular-email-editor';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { ComponentsModule } from 'src/app/components/module';
import { EmailTemplateComponent } from './email-template.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ClipboardModule } from 'ngx-clipboard';
@NgModule({
  declarations: [EmailTemplateComponent],
  imports: [
    CommonModule,
    FormsModule,
    EmailEditorModule,
    ComponentsModule,
    FilePickerModule,
    TabsModule.forRoot(),
    ClipboardModule,
    RouterModule.forChild([{ path: '', component: EmailTemplateComponent }])
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmailTemplateModule { }
