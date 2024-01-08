import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Models/ConfigData.dart';
import 'package:bossjobapp/Models/IndustryFilterModel.dart';
import 'package:bossjobapp/Models/JobFilterModel.dart';
import 'package:bossjobapp/Models/LocationModel.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:easy_debounce/easy_debounce.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class RegisterFlowController extends BaseController {
  RxInt flowIndex = 0.obs;
  RxBool loading = false.obs;

  Rx<RangeValues> salaryRange = new RangeValues(10000, 200000).obs;
  RxList<int> selectedIndex = new List<int>.empty().obs;
  RxString selectedJobType = ''.obs;

  RxBool jobLoading = false.obs;
  Rx<JobFilterModel> jobFilterModel = new JobFilterModel().obs;
  Rx<JobFilterModelDataJobs> selectedJob = JobFilterModelDataJobs().obs;

  RxBool industryLoading = false.obs;
  Rx<IndustryFilterModel> industryFilterModel = new IndustryFilterModel().obs;
  Rx<IndustryFilterModelDataIndustry> selectedIndustry =
      new IndustryFilterModelDataIndustry().obs;

  Rx<LocationModelDataLocations> selectedLocation =
      new LocationModelDataLocations().obs;

  RxList<ConfigDataDataInputsJobCategoryLists> selectedJobCate =
      new List<ConfigDataDataInputsJobCategoryLists>.empty().obs;

  RxBool isValidToSubmit = false.obs;

  checkValid() {
    isValidToSubmit.value = false;
    // check category at least one
    if (selectedJobCate.length == 0) {
      return;
    }
    // check job
    if (selectedJob.value.jobTitle == null) {
      return;
    }
    // check job type
    if (selectedJobType.value == '') {
      return;
    }
    // check location
    if (selectedLocation.value.value == null) {
      return;
    }
    // check industry
    if (selectedIndustry.value.value == null) {
      return;
    }
    isValidToSubmit.value = true;
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

  Future searchIndustry(query) async {
    EasyDebounce.debounce(
      'searchIndustry-debouce',
      Duration(milliseconds: 1000),
      () async {
        industryLoading.value = true;
        var json = await apiService.industryFilter(query);
        industryFilterModel.value = IndustryFilterModel.fromJson(json);
        industryLoading.value = false;
      },
    );
  }

  Future submitPref() async {
    if (!isValidToSubmit.value) {
      return;
    }
    var pattern = "[\\~#%&*{}()/:<>?|\"-]";
    var data = {
      'job_title': selectedJob.value.jobTitle,
      'job_type_key': selectedJobType.value.replaceAll(RegExp(pattern), ""),
      'location_key': selectedLocation.value.key,
      'country_key': 'ph',
      'salary_range_from': salaryRange.value.start.toInt(),
      'salary_range_to': salaryRange.value.end.toInt(),
      'industry_key': selectedIndustry.value.key,
      'job_category_id': selectedJobCate.map((element) => element.id).toList(),
    };
    var json = await apiService.submitPreference(data);
    if (json['status_code'] == 200 || json['status_code'] == 201) {
      AnalyticsService().addInfo("onboarding");
      Get.offAndToNamed('/index');
    }
  }

  setSelectedIndex(v) {
    if (selectedIndex.contains(v)) {
      selectedIndex.remove(v);
    } else {
      selectedIndex.add(v);
    }
  }

  setFlowIndex(v) {
    this.flowIndex.value = v;
  }

  setLoading(v) {
    this.loading.value = v;
  }

  updateSelectedJobCate(val) {
    selectedJobCate.addIf(!selectedJobCate.contains(val), val);
    checkValid();
  }

  removeSelectedJobCate(val) {
    selectedJobCate.remove(val);
  }

  updateSelectedJobType(val) {
    selectedJobType.value = val;
    checkValid();
  }

  updateSelectedLocation(val) {
    selectedLocation.value = val;
    checkValid();
  }

  updateSalaryrange(val) {
    salaryRange.value = val;
    checkValid();
  }

  updateSeletedJob(val) {
    selectedJob.value = val;
    // reset filter data
    jobFilterModel.value = new JobFilterModel();
    checkValid();
  }

  removeSeletedJob() {
    selectedJob.value = JobFilterModelDataJobs();
  }

  updateSeletedIndustry(val) {
    selectedIndustry.value = val;
    // reset filter data
    industryFilterModel.value = new IndustryFilterModel();
    checkValid();
  }

  removeSeletedIndustry() {
    selectedIndustry.value = IndustryFilterModelDataIndustry();
  }

  @override
  void dispose() {
    EasyDebounce.cancel('searchJob-debouce');
    EasyDebounce.cancel('searchIndustry-debouce');
    super.dispose();
  }
}
