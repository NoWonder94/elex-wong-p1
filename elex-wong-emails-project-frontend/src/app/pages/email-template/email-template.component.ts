import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FilePickerAdapter, FilePreviewModel } from 'ngx-awesome-uploader';
import { ClipboardService } from 'ngx-clipboard';
import { BehaviorSubject } from 'rxjs';
import { SimpleBoxEditComponent } from 'src/app/components/simple-box-edit/simple-box-edit.component';
import { CampaignJson } from 'src/app/model/campaigns/campaign';
import { EmailTemplate, Image } from 'src/app/model/emailtemplate';
import { Project } from 'src/app/model/project';
import { CampaignService } from 'src/app/services/campaign.service';
import { EmailingService } from 'src/app/services/emailing.service';
import { FilesService } from 'src/app/services/files.service';
import { ProjectService } from 'src/app/services/project.service';
import { ToastService } from 'src/app/services/toast.service';
import { Logger } from 'src/app/utils/logger';
import { loadScript } from './unlayerScripting';
let unlayer = (<any>window).unlayer; // Dirty way to access this library

const fakesize = 10000;//unlayer only receive imagesize under 2mb, this project limit is 10mb
@Component({
  selector: 'email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})

export class EmailTemplateComponent implements OnInit {
  private projectId: number;
  public project: Project = null;

  private templateId: number;
  public template: EmailTemplate = null;

  public savingTemplate = false;

  private onTemplateLoaded = new BehaviorSubject(false);

  public galleryImage: Image[] = [];

  public imgUploadAdapter: FilePickerAdapter;
  public uploadFile: File;
  public uploadingFile = false;

  public allEmailTemplate: EmailTemplate[] = [];
  public unsavedEmailTemplate: EmailTemplate;
  public allCampaign: CampaignJson[] = [];
  public selectingImg = false;
  public selectedDeleteImage: Image;
  private activeModalRef: NgbModalRef;

  loadScriptPromise: Promise<any>;
  scriptIsLoad = false;
  bindModalListen = false;

  constructor(private router: Router,
    private zone: NgZone,
    private route: ActivatedRoute,
    private projectsService: ProjectService,
    private emailingService: EmailingService,
    private campaignsService: CampaignService,
    private filesService: FilesService,
    private modalService: NgbModal,
    private toast: ToastService,
    private clipboardService: ClipboardService,
  ) { }

  async ngOnInit() {
    console.log('Init');

    loadScript(() => {
      console.log('Unlayer script has been loading.')

      unlayer = (<any>window).unlayer;
      this.route.params.subscribe(params => {
        this.projectId = parseInt(params['projectId']);
        this.templateId = parseInt(params['templateId']);

        this.imgUploadAdapter = this.filesService.createGenericPictureUploadAdapter(this.projectId);
        // Fetch the latest project info (this url can be opened directly)
        this.projectsService.fetchProjects().then(async projects => {
          this.project = projects.find(p => p.id === this.projectId);

          // Fetch the template info
          this.template = await this.emailingService.fetchEmailTemplateById(this.templateId);
          this.unsavedEmailTemplate = this.template;
          this.onTemplateLoaded.next(true);

          //get all image used in this project
          await this.getAllImage();

          unlayer.init({
            id: 'editor-container',
            appearance: {
              theme: 'light'
            },
            features: {
              pageAnchors: true
            }
          })

          // //upload image file
          // unlayer.registerCallback('image', (file, done) => {
          //   //console.log('file upload image', file, done);
          //   this.uploadImage(file, done);
          // })

          //unbind click to avoid multiple call
          $('#mediaLibrary').on('unbindModal', function () {
            $('#mediaLibrary .images .imgCover').unbind('click');
            // console.log('unbind');
          });

          //select image from gallery
          unlayer.registerCallback('selectImage', async (data, done) => {
            //console.log('file upload image', file, done);

            //rerender modal
            this.zone.run(() => { });
            $('#mediaLibrary').show();
            $('body').css('overflow', 'hidden');
            $('#mediaLibrary').trigger('unbindModal');

            //if bind event not listen yet
            if (!this.bindModalListen) {

              $('#mediaLibrary').on('bindModal', () => {
                // console.log('bind');

                //bind click event
                $('#mediaLibrary .images .imgCover').bind('click', async (e) => {

                  if (this.selectingImg) return

                  this.selectingImg = true;

                  let imgurl = $(e.target).attr('data-thisimg');
                  console.log(imgurl);

                  if (imgurl) {
                    console.log('Uploading selected file url');
                    done({ url: imgurl, size: fakesize });
                  }

                  await this.getAllImage();

                  setTimeout(() => {
                    // Close the pop up
                    $('body').css('overflow', '');
                    $('#mediaLibrary').hide();
                    this.selectingImg = false;
                  }, 400);


                });
              })
              this.bindModalListen = true;
            }

            //trigger bind click event to each images
            $('#mediaLibrary').trigger('bindModal');

            //listen on event when uploading a new picture
            $('#mediaLibrary .uploader').on('receiveURL', async () => {
              if (this.uploadingFile) return

              this.uploadingFile = true;

              if (this.uploadFile != null) {
                console.log('Uploading file url');
                done({ url: this.getImagePath(this.uploadFile), size: fakesize });
              }

              console.log('Refresh image gallery');
              await this.getAllImage();

              //close gallery pop
              $('body').css('overflow', '');
              $('#mediaLibrary').hide();
              this.uploadFile = null;
              this.uploadingFile = false;
            });


          })

          unlayer.setMergeTags({
            // TODO: This is a test
            first_name: {
              name: "First Name",
              value: "{{first_name}}",
              sample: "John"
            },
            last_name: {
              name: "Last Name",
              value: "{{last_name}}",
              sample: "Doe"
            }
          });

          unlayer.addEventListener("editor:ready", (data) => {
            Logger.log('email-template', 'Email editor is ready');

            this.onTemplateLoaded.subscribe(loaded => {
              if (loaded) {
                // Load the previously saved template
                let templateJson = this.template.template_json ? JSON.parse(this.template.template_json) : null;
                console.log("templateJson", templateJson)

                if (templateJson && Object.keys(templateJson).length > 0) {
                  unlayer.loadDesign(templateJson);
                }
              }
            });
          })
        });
      });
    });
  }

  public goBack() {
    this.router.navigateByUrl(`/project/${this.project.id}`);
  }

  /* exportHtml() {
    this.emailEditor.saveDesign(data => {
      console.log('saveDesign', data)
    });
    this.emailEditor.editor.exportHtml((data) =>
      console.log('exportHtml', data)
    );
    this.emailEditor.editor.exportPlainText((data) =>
      console.log('exportText', data)
    );
  } */

  public async onNameEdited(editBox: SimpleBoxEditComponent) {
    this.saveProjectField(editBox, "name", editBox.value);
  }

  private async saveProjectField(editBox: SimpleBoxEditComponent, key: string, value: number | string) {
    editBox.setSaving(true);
    await this.emailingService.updateTemplateInfo(this.project.id, this.template.id, key, value);
    editBox.setSaving(false);
  }

  async saveTemplate() {

    if (this.savingTemplate || this.selectingImg) {

      if (this.savingTemplate) this.toast.warning('The template is saving.');
      else if (this.selectingImg) this.toast.warning('The selected image url is uploading. Please try again later');
      return;
    }

    this.savingTemplate = true;

    unlayer.exportHtml(async data => {
      let jsonStr = JSON.stringify(data.design);
      let html = data.html;
      await this.emailingService.updateTemplateInfo(this.project.id, this.template.id, "template_json", jsonStr);
      await this.emailingService.updateTemplateInfo(this.project.id, this.template.id, "html", html);
      this.savingTemplate = false;
    });

    setTimeout(() => {
      //get all image for checking is able to delete
      this.getAllImage();
    }, 500);
  }



  async getTemplatetJson() {
    await unlayer.saveDesign(json => {
      let jsonStr = JSON.stringify(json);
      this.unsavedEmailTemplate.template_json = jsonStr;
      // console.log('gettemplate', jsonStr);
    });
  }

  public getImagePath(files): string {
    return this.filesService.getFileDownloadPath(files);
  }

  public async getAllImage() {
    this.galleryImage = [];
    //get all template for checking whether the image is been used
    this.allEmailTemplate = await this.emailingService.fetchEmailTemplates(this.project);
    this.allCampaign = await this.campaignsService.fetchCampaigns(this.project);

    //get current unsave template
    await this.getTemplatetJson();

    setTimeout(() => {
      // console.log(this.unsavedEmailTemplate.template_json);
      this.filesService.getAllImageByProjectId(this.projectId).subscribe(val => {
        // console.log('myfiles', val.file);
        val.file.forEach(element => {
          let url = this.getImagePath(element);
          this.galleryImage.push({ id: element.id, url: url, canDelete: this.canDelete(url, element.id), file: element });

        });
      });
    }, 500);

  }

  public closeGalleryPop() {
    $('#mediaLibrary').hide();
    $('body').css('overflow', '');
  }

  public async onImageUploaded(successResponse: FilePreviewModel) {
    if (successResponse && successResponse.uploadResponse) {
      let uploadedFile: File = successResponse.uploadResponse.file;
      Logger.log("Email", "Picture was uploaded", uploadedFile);

      this.uploadFile = uploadedFile;
      $('#mediaLibrary .uploader').trigger('receiveURL');
    }
  }

  public copied(url) {
    this.clipboardService.copy(url);
    this.toast.info("Copied to clipboard!");
  }

  public canDelete(url, id) {
    let canDelete = true;

    //check whether the image is in the template list
    this.allEmailTemplate.forEach((val) => {
      if (val.template_json.includes(url)) {
        canDelete = false;
      }
    });

    //unsavedEmailTemplate
    if (this.unsavedEmailTemplate.template_json.includes(url))
      canDelete = false;


    this.allCampaign.forEach((val) => {
      if (val.banner != null && val.banner.id == id) {
        console.log(val.banner);
        canDelete = false;
      }
    })

    if (this.project.logo != null && this.project.logo.id == id)
      canDelete = false;

    return canDelete;
  }

  public opendeletePop(img: Image, content) {
    this.selectedDeleteImage = img;
    this.openPop(content);
  }

  public openPop(content) {
    this.activeModalRef = this.modalService.open(content);
  }

  public deleteImg() {
    this.filesService.deleteImage(this.selectedDeleteImage.id).subscribe(async (val) => {
      if (val.status) {
        this.toast.info(val.msg);
      } else {
        this.toast.error("File are not able to delete.");
      }
      this.selectedDeleteImage = null;
      this.activeModalRef.close();

      await this.getAllImage();
      setTimeout(() => {
        $('#mediaLibrary').trigger('unbindModal');
        $('#mediaLibrary').trigger('bindModal');
      }, 100);
    });
  }

  public async archiveEmailTemplate() {
    await this.emailingService.updateTemplateInfo(this.project.id, this.template.id, 'is_archived', 'true');
    this.activeModalRef.close();
    this.router.navigateByUrl(`/project/${this.project.id}`);
  }
}
