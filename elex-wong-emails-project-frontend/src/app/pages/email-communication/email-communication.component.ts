import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SimpleBoxEditComponent } from 'src/app/components/simple-box-edit/simple-box-edit.component';
import { ProjectEmailing, ProjectEmailingStatus } from 'src/app/model/projectemailing';
import { EmailTemplate } from 'src/app/model/emailtemplate';
import { Project } from 'src/app/model/project';
import { EmailingService } from 'src/app/services/emailing.service';
import { ProjectService } from 'src/app/services/project.service';
import { ToastService } from 'src/app/services/toast.service';
import { ProjectEmailingService } from 'src/app/services/project-emailing.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'email-communication',
  templateUrl: './email-communication.component.html',
  styleUrls: ['./email-communication.component.scss']
})

export class EmailCommunicationComponent implements OnInit {
  private projectId: number;
  public project: Project = null;

  private emailingId: number;
  public emailCommunication: ProjectEmailing = null;
  public fetchingEmailCom = true;

  public allEmailTemplate: EmailTemplate[] = [];

  public editable = true;

  public hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null;

  public modelToDate: NgbDateStruct;
  public modelFromDate: NgbDateStruct;
  public minDate = null;

  constructor(
    private router: Router,
    private zone: NgZone,
    private route: ActivatedRoute,
    private projectsService: ProjectService,
    private emailingService: EmailingService,
    private projectEmailingService: ProjectEmailingService,
    private toast: ToastService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.projectId = parseInt(params['projectId']);
      this.emailingId = parseInt(params['emailingId']);

      this.projectsService.fetchProjects().then(async projects => {
        this.project = projects.find(p => p.id === this.projectId);

        this.allEmailTemplate = await this.emailingService.fetchEmailTemplates(this.project);

        this.emailCommunication = await this.projectEmailingService.fetchEmailTemplateById(this.emailingId);

        if (this.emailCommunication.status != ProjectEmailingStatus.NONE) {
          this.editable = false;
        }

        this.fetchingEmailCom = false;
      });

    });
  }

  public goBack() {
    this.router.navigateByUrl(`/project/${this.project.id}`);
  }

  public async onTitleEdited(editBox: SimpleBoxEditComponent) {
    this.saveProjectField(editBox, "title", editBox.value);
  }
  public async onTemplateEdited(editBox: SimpleBoxEditComponent) {
    await this.saveProjectField(editBox, "emailTemplateEid", editBox.value);
    this.emailCommunication.emailTemplateEid = editBox.value as number;
  }

  private async saveProjectField(editBox: SimpleBoxEditComponent, key: string, value: number | string) {
    editBox.setSaving(true);
    await this.projectEmailingService.updateEmailingInfo(this.projectId, this.emailingId, key, value);
    editBox.setSaving(false);
    this.getEmailCommunication();
  }

  public async getEmailCommunication() {
    this.emailCommunication = await this.projectEmailingService.fetchEmailTemplateById(this.emailingId);
    if (this.emailCommunication.status != ProjectEmailingStatus.NONE) {
      this.editable = false;
    }
  }

  public async changeStatus(status) {
    if (status == 1) {
      if (this.emailCommunication.emailTemplateEid == null) {
        this.toast.error('Email Template are not selected');
        return
      }
    }
    await this.projectEmailingService.updateEmailingInfo(this.projectId, this.emailingId, 'status', status).then();
    this.getEmailCommunication();
  }

  public async onDateSelection(selectedDate: NgbDate, from: string) {
    var date = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day).toISOString(); // from milliseconds to seconds

    if (from == 'startdate') {
      this.fromDate = selectedDate;
      await this.projectEmailingService.updateEmailingInfo(this.projectId, this.emailingId, 'start_date', date);
      if (selectedDate.after(this.toDate)) {
        var newEndDate = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day + 1).toISOString(); // from milliseconds to seconds
        this.toDate = this.calendar.getNext(selectedDate, 'm', 1);
        await this.projectEmailingService.updateEmailingInfo(this.projectId, this.emailingId, 'end_date', newEndDate);
      }
    } else {
      if (!this.fromDate) {
        this.toast.error("Please select start date");
      } else if (this.fromDate && selectedDate.after(this.fromDate)) {
        this.toDate = selectedDate;
        await this.projectEmailingService.updateEmailingInfo(this.projectId, this.emailingId, 'end_date', date);
      } else {
        console.log(this.toDate);
        if (this.toDate != null)
          this.modelToDate = { day: this.toDate.day, year: this.toDate.year, month: this.toDate.month };
        else
          this.modelToDate = { day: 0, year: 0, month: 0 };

        this.toast.error("End date cannot early than start date");
      }
    }
    this.getEmailCommunication();
  }
}
