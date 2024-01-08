import 'package:bossjobapp/Constants/constant.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Models/JobFilterModel.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:easy_debounce/easy_debounce.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class JobPreferenceController extends BaseController {
  AppController appController = Get.find();
  ConfigService configService = Get.find();

  Rx<RangeValues> salaryRange = new RangeValues(rangebarMin, rangebarMax).obs;
  RxList<String> selectedSpecialization = new List<String>.empty().obs;
  RxString location = ''.obs;
  RxString industry = ''.obs;

  RxBool jobLoading = false.obs;
  Rx<JobFilterModel> jobFilterModel = new JobFilterModel().obs;
  Rx<JobFilterModelDataJobs> selectedJob = JobFilterModelDataJobs().obs;
  RxString selectedJobType = ''.obs;
  RxBool isValidToSubmit = false.obs;
  RxBool isApiLoading = false.obs;

  @override
  void onInit() async {
    if (appController.userInfo.value.data!.latestPreference != null) {
      if (appController
              .userInfo.value.data!.latestPreference!.categories!.length >
          0) {
        appController.userInfo.value.data!.latestPreference!.categories!
            .forEach((element) {
          updateSelectedSpecialization(element!.value.toString());
        });
      }
      if (appController.userInfo.value.data!.latestPreference!.jobTitle !=
          null) {
        updateSeletedJobTitle(
            appController.userInfo.value.data!.latestPreference!.jobTitle);
      }

      if (appController.userInfo.value.data!.latestPreference!.jobTypeKey !=
          null) {
        updateSelectedJobType('(' +
            appController.userInfo.value.data!.latestPreference!.jobTypeKey! +
            ')');
      }
      if (appController.userInfo.value.data!.latestPreference!.location !=
          null) {
        setLocation(
            appController.userInfo.value.data!.latestPreference!.location);
      }
      if (appController.userInfo.value.data!.latestPreference!.industry !=
          null) {
        setIndustry(
            appController.userInfo.value.data!.latestPreference!.industry);
      }
    }

    super.onInit();
  }

  setLocation(v) {
    this.location.value = v;
  }

  updateSelectedSpecialization(val) {
    selectedSpecialization.addIf(!selectedSpecialization.contains(val), val);
  }

  removeSelectedSpecialization(val) {
    selectedSpecialization.remove(val);
  }

  updateSalaryRange(val) {
    salaryRange.value = val;
  }

  updateSeletedJob(val) {
    selectedJob.value = val;
    // reset filter data
    jobFilterModel.value = new JobFilterModel();
  }

  removeSeletedJob() {
    selectedJob.value = JobFilterModelDataJobs();
  }

  updateSeletedJobTitle(val) {
    selectedJob.value.jobTitle = val;
  }

  updateSelectedJobType(val) {
    selectedJobType.value = val;
  }

  checkValidation() {
    isValidToSubmit.value = false;

    if (appController.userInfo.value.data!.latestPreference != null) {
      if (location.value == '') {
        showError('error'.tr, 'locationEmpty_error'.tr);
        return;
      }
      if (this.selectedSpecialization.length == 0) {
        showError('error'.tr, 'jobCateEmpty_error'.tr);
        return;
      }

      if (selectedJob.value.jobTitle == null) {
        showError('error'.tr, 'jobTitleEmpty_error'.tr);
        return;
      }

      if (industry.value == '') {
        showError('error'.tr, 'industryEmpty_error'.tr);
        return;
      }
    }

    isValidToSubmit.value = true;
  }

  updatePreference() {
    checkValidation();

    if (isValidToSubmit.value) {
      submitPreference();
    }
  }

  Future submitPreference() async {
    this.isApiLoading.value = true;

    var data = {
      'country_key': "ph",
      'job_title': selectedJob.value.jobTitle,
      'job_type_key':
          selectedJobType.value.replaceAll('(', '').replaceAll(')', ''),
      'location_key': configService.getLocationKeyByValue(location.value),
      'industry_key': configService.getIndustryKeyByValue(industry.value),
      'salary_range_from': salaryRange.value.start.toInt(),
      'salary_range_to': salaryRange.value.end.toInt(),
      'job_category_id':
          configService.getSpecializationListKeyByValue(selectedSpecialization)
    };

    var json = await apiService.submitPreference(data);
    if (json['status_code'] == 200 || json['status_code'] == 201) {
      AnalyticsService().updateResume("job-pref");
      showSuccess('success'.tr, 'updateSuccess'.tr);
      appController.getUserProfile();
      Future.delayed(
        Duration(
          milliseconds: 3000,
        ),
        () {
          Get.back();
        },
      );
    }

    this.isApiLoading.value = true;
  }

  setIndustry(v) {
    industry.value = v;
  }

  Future searchJob(query) async {
    EasyDebounce.debounce(
      'searchJob-debouce',
      Duration(milliseconds: 1000),
      () async {
        jobLoading.value = true;
        var json = await apiService.jobFilter(query);
        jobFilterModel.value = JobFilterModel.fromJson(json);
        jobFilterModel.value.data!.jobs!
            .insert(0, new JobFilterModelDataJobs(jobTitle: query));
        jobLoading.value = false;
      },
    );
  }

  @override
  void dispose() {
    EasyDebounce.cancel('searchJob-debouce');
    super.dispose();
  }
}
