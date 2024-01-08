import 'package:bossjobapp/Models/JobCompanyModel.dart';
import 'package:bossjobapp/Models/JobCompanyOthersJobsModel.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../BaseController.dart';

class CompanyInfomationController extends BaseController {
  final ScrollController scrollController = ScrollController();

  Rx<JobCompanyModel> companyModel = new JobCompanyModel().obs;
  Rx<JobCompanyOthersJobsModel> companyJobModel =
      new JobCompanyOthersJobsModel().obs;
  RxBool isJobCompanyLoading = false.obs;
  RxBool isCompanyOthersJobLoading = false.obs;
  RxList jobCompanyJobsList = [].obs;
  int totalPages = 0;
  var page = 1;

  @override
  void onInit() {
    if (Get.arguments != null) {
      if (Get.arguments['companyID'] != null) {
        getCompanyData(Get.arguments['companyID']);
        getCompanyJobData(Get.arguments['companyID'], page);

        scrollController.addListener(() {
          if (scrollController.position.pixels >=
              scrollController.position.maxScrollExtent) {
            getCompanyJobData(Get.arguments['companyID'], ++page);
          }
        });
      }
    }

    super.onInit();
  }

  void getCompanyData(id) async {
    this.isJobCompanyLoading.value = true;

    var json = await apiService.getJobCompany(id);
    if (json['success'] == false) {
      showError('error'.tr, json['errors'].toString());
      this.isJobCompanyLoading.value = false;
      return;
    }
    companyModel.value = JobCompanyModel.fromJson(json);
    this.isJobCompanyLoading.value = false;
  }

  void getCompanyJobData(id, page) async {
    if (page == 1) {
      this.isCompanyOthersJobLoading.value = true;
      if (this.jobCompanyJobsList.length > 1) {
        this.jobCompanyJobsList.clear();
      }
    }
    if (totalPages == 0 || page <= totalPages) {
      var params = {
        'page': page,
        'size': 20,
      };

      var json = await apiService.getJobCompanyOtherJobs(id, params);
      if (json['success'] == false) {
        showError('error'.tr, json['errors'].toString());
        if (page == 1) {
          this.isCompanyOthersJobLoading.value = false;
        }
        return;
      }
      companyJobModel.value = JobCompanyOthersJobsModel.fromJson(json);
      if (page == 1) {
        AnalyticsService().viewCompany(
            id: id,
            industry: companyModel.value.data!.industry,
            jobsCount: companyJobModel.value.data!.totalNum!);
        this.isCompanyOthersJobLoading.value = false;
      }
      if (json['data']['jobs'] != null && json['data']['jobs'].length > 0) {
        // print(json['data']['total_pages']);
        totalPages = json['data']['total_pages'];
        this.jobCompanyJobsList.addAll(json['data']['jobs']);
      }
    }
  }

  @override
  void dispose() {
    super.dispose();
    scrollController.dispose();
  }
}
