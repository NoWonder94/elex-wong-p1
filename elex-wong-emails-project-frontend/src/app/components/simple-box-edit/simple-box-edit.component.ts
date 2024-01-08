import { Component, EventEmitter, Input, NgZone, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { NetworksService } from 'src/app/services/networks.service';
import { ProjectService } from 'src/app/services/project.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'simple-box-edit',
  templateUrl: './simple-box-edit.component.html',
  styleUrls: ['./simple-box-edit.component.scss']
})
export class SimpleBoxEditComponent implements OnInit {
  @ViewChildren("input") inputElements: QueryList<any>;

  @Input()
  public heading = "";

  @Input()
  public lines = 1;

  @Input()
  public options = [];

  @Input()
  public value: number | string = "";
  public editedValue: number | string = "";

  @Input()
  public disable = false;

  @Input()
  public selectKey = '';

  @Input()
  public mode: "default" | "select" = "default";

  @Output()
  public edited = new EventEmitter<SimpleBoxEditComponent>();

  public editing = false;
  public saving = false;


  constructor(private router: Router,
    private web3Service: Web3Service,
    private zone: NgZone,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private projectsService: ProjectService,
    private campaignsService: CampaignService,
    private sanitizer: DomSanitizer,
    private networksService: NetworksService) {
  }

  async ngOnInit() {

    // this.inputElements.

  }

  public toggleEdit() {
    if (!this.editing) {
      this.editedValue = this.value;

      setTimeout(() => {
        this.inputElements.first.nativeElement.focus()
      }, 0);
    }

    this.editing = !this.editing;
  }

  public onBlur() {
    this.editing = false;

    if (this.value !== this.editedValue) {
      this.value = this.editedValue;
      this.edited?.emit(this);
    }
  }

  /**
   * Called by the parent component to show or hive the "saving" indicator
   */
  public setSaving(saving: boolean) {
    this.saving = saving;
  }

  public getDisplayValue(): string {
    if (this.mode == 'select') {
      let selected = this.options.find(e => e.id == this.value);
      return selected ? selected.name : '';
    }
    return this.value ? this.escapeHtml(`${this.value}`).replace(/\n/g, "<br/>") : "";
  }

  private escapeHtml(htmlStr: string): string {
    return htmlStr.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
}
