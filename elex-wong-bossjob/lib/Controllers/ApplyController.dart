import 'package:bossjobapp/Constants/common.dart';
import 'package:bossjobapp/Constants/constant.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Models/CompanyFilterModel.dart';
import 'package:bossjobapp/Models/JobTitleFilterModel.dart';
import 'package:bossjobapp/Models/SchoolFilterModel.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:bossjobapp/Services/UploadService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:easy_debounce/easy_debounce.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

class ApplyController extends BaseController {
  AppController appController = Get.put(AppController());
  ConfigService configService = Get.find();
  UploadService uploadService = Get.put(UploadService());
  RxBool isApiLoading = false.obs;

  Rx<RangeValues> salaryRange = new RangeValues(rangebarMin, rangebarMax).obs;

  RxString phone = ''.obs;
  RxString location = ''.obs;
  RxList<String> selectedSpecialization = new List<String>.empty().obs;
  RxString filename = ''.obs;
  RxBool loading = false.obs;
  int availabilityIndex = 0;
  RxInt curPage = 1.obs;

  RxBool isValidToSubmitStepOne = false.obs;
  RxBool isValidToSubmitStepTwo = false.obs;
  RxBool isValidToSubmitStepThree = false.obs;

  RxBool jobLoading = false.obs;
  Rx<JobTitleFilterModel> jobFilterModel = new JobTitleFilterModel().obs;
  Rx<JobTitleFilterModelDataJobs> selectedJob =
      JobTitleFilterModelDataJobs().obs;

  RxList<String> selectedSpecializationWorkingExp =
      new List<String>.empty().obs;
  RxString industry = ''.obs;

  RxBool companyLoading = false.obs;
  Rx<CompanyFilterModel> companyFilterModel = new CompanyFilterModel().obs;
  Rx<CompanyFilterModelDataCompanies> selectedCompany =
      new CompanyFilterModelDataCompanies().obs;

  RxString locationWorkingExp = ''.obs;
  RxString salaryWorkingExp = ''.obs;
  RxString startDate = ''.obs;
  RxString endDate = ''.obs;
  RxBool checkboxWorkingExp = false.obs;

  RxBool schoolLoading = false.obs;
  Rx<SchoolFilterModel> schoolFilterModel = new SchoolFilterModel().obs;
  Rx<SchoolFilterModelDataSchools> selectedSchool =
      new SchoolFilterModelDataSchools().obs;

  RxString studyField = ''.obs;
  RxString education = ''.obs;
  RxString startDateEdu = ''.obs;
  RxString endDateEdu = ''.obs;
  RxBool checkboxEdu = false.obs;
  RxString locationEdu = ''.obs;

  RxString applyMessage = ''.obs;
  RxBool isApplyApplicationLoading = false.obs;
  RxBool isAutoGenerateResume = false.obs;

  RxList<String> answer = new List<String>.filled(3, '').obs;

  @override
  void onInit() async {
    if (appController.userInfo.value.data != null) setStepOneInitValue();
    super.onInit();
  }

  setStepOneInitValue() {
    if (appController.userInfo.value.data!.phoneNum != null) {
      setPhone(appController.userInfo.value.data!.phoneNum);
    }

    if (appController.userInfo.value.data!.location != null) {
      setLocation(appController.userInfo.value.data!.location);
    }

    if (appController.userInfo.value.data!.noticePeriodId != 0) {
      setAvailabilityIndex(appController.userInfo.value.data!.noticePeriodId);
    }

    if (appController.userInfo.value.data!.latestPreference != null) {
      if (appController
              .userInfo.value.data!.latestPreference!.categories!.length >
          0) {
        appController.userInfo.value.data!.latestPreference!.categories!
            .forEach((element) {
          updateSelectedSpecialization(element!.value.toString());
        });
      }

      updateSalaryRange(RangeValues(
          double.parse(appController
              .userInfo.value.data!.latestPreference!.salaryRangeFrom
              .toString()),
          double.parse(appController
              .userInfo.value.data!.latestPreference!.salaryRangeTo
              .toString())));
    }
  }

  setStepTwoInitValue() {
    if (appController.userInfo.value.data!.latestWorkXp != null) {
      if (appController.userInfo.value.data!.latestWorkXp!.jobTitle != null) {
        updateSeletedJobName(
            appController.userInfo.value.data!.latestWorkXp!.jobTitle);
      }

      if (appController.userInfo.value.data!.latestWorkXp!.categories != null) {
        appController.userInfo.value.data!.latestWorkXp!.categories!
            .toJson()
            .values
            .forEach((value) {
          if (value != null) updateSelectedSpecializationWorkingExp(value);
        });
      }
      if (appController.userInfo.value.data!.latestWorkXp!.company != '') {
        updateSeletedCompanyName(
            appController.userInfo.value.data!.latestWorkXp!.company);
      }
      if (appController.userInfo.value.data!.latestWorkXp!.location != '') {
        setLocationWorkingExp(
            appController.userInfo.value.data!.latestWorkXp!.location);
      }
      if (appController.userInfo.value.data!.latestWorkXp!.companyIndustry !=
          '') {
        setIndustry(
            appController.userInfo.value.data!.latestWorkXp!.companyIndustry);
      }
      if (appController.userInfo.value.data!.latestWorkXp!.salary != 0) {
        setSalaryWorkingExp(
            appController.userInfo.value.data!.latestWorkXp!.salary.toString());
      }

      if (appController.userInfo.value.data!.latestWorkXp!.workingPeriodFrom !=
          null) {
        setStartDate(
            appController.userInfo.value.data!.latestWorkXp!.workingPeriodFrom);
      } else {
        String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
        setStartDate(date);
      }

      if (appController.userInfo.value.data!.latestWorkXp!.workingPeriodTo !=
          null) {
        setEndDate(
            appController.userInfo.value.data!.latestWorkXp!.workingPeriodTo);
      } else {
        String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
        setEndDate(date);
      }

      setCheckboxWorkingExp(
          appController.userInfo.value.data!.latestWorkXp!.isCurrentlyWorkHere);
    }

    if (startDate.value == '') {
      String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
      setStartDate(date);
    }
    if (endDate.value == '') {
      String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
      setEndDate(date);
    }
  }

  setStepThreeInitValue() {
    if (startDateEdu.value == '') {
      String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
      setStartDateEdu(date);
    }
    if (endDateEdu.value == '') {
      String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
      setEndDateEdu(date);
    }

    if (appController.userInfo.value.data!.latestEducation != null) {
      if (appController.userInfo.value.data!.latestEducation!.school != null) {
        updateSeletedSchoolName(
            appController.userInfo.value.data!.latestEducation!.school);
      }
      if (appController.userInfo.value.data!.latestEducation!.fieldOfStudy !=
          null) {
        setStudyFeild(
            appController.userInfo.value.data!.latestEducation!.fieldOfStudy);
      }
      if (appController.userInfo.value.data!.latestEducation!.degree != null) {
        setEducation(
            appController.userInfo.value.data!.latestEducation!.degree);
      }
      if (appController.userInfo.value.data!.latestEducation!.location !=
          null) {
        setLocationEdu(
            appController.userInfo.value.data!.latestEducation!.location);
      }

      if (appController.userInfo.value.data!.latestEducation!.studyPeriodFrom !=
          null) {
        setStartDateEdu(appController
            .userInfo.value.data!.latestEducation!.studyPeriodFrom);
      } else {
        String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
        setStartDateEdu(date);
      }
      if (appController.userInfo.value.data!.latestEducation!.studyPeriodTo !=
          null) {
        setEndDateEdu(
            appController.userInfo.value.data!.latestEducation!.studyPeriodTo);
      } else {
        String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
        setEndDateEdu(date);
      }

      if (appController
              .userInfo.value.data!.latestEducation!.isCurrentlyStudying ==
          1) {
        setCheckboxEdu(true);
      }
    }
  }

  setCurPage(v) {
    curPage.value = v;
  }

  setPhone(v) {
    this.phone.value = v;
  }

  setLocation(v) {
    this.location.value = v;
  }

  setAvailabilityIndex(v) {
    availabilityIndex = v;
  }

  updateSeletedJob(val) {
    selectedJob.value = val;
    // reset filter data
    jobFilterModel.value = new JobTitleFilterModel();
  }

  removeSeletedJob() {
    selectedJob.value = JobTitleFilterModelDataJobs();
  }

  updateSelectedSpecialization(val) {
    selectedSpecialization.addIf(!selectedSpecialization.contains(val), val);
  }

  removeSelectedSpecialization(val) {
    selectedSpecialization.remove(val);
  }

  updateSelectedSpecializationWorkingExp(val) {
    selectedSpecializationWorkingExp.addIf(
        !selectedSpecializationWorkingExp.contains(val), val);
  }

  removeSelectedSpecializationWorkingExp(val) {
    selectedSpecializationWorkingExp.remove(val);
  }

  updateResume() async {
    uploadService.upload(
      type: UploadType.RESUME,
      onLoading: () {
        loading.value = true;
      },
      onSuccess: (fileName) {
        filename.value = fileName;
        loading.value = false;
        showSuccess('success'.tr, 'resumeUpdated'.tr);
        appController.getUserProfile();
      },
      onFailed: (error) {
        loading.value = false;
        showError('Failed', error);
      },
    );
  }

  updateSalaryRange(val) {
    salaryRange.value = val;
  }

  checkValidStepOne() {
    isValidToSubmitStepOne.value = false;

    if (phone.value == '') {
      showError('error'.tr, 'mobileEmpty_error'.tr);
      return;
    }
    if (location.value == '') {
      showError('error'.tr, 'locationEmpty_error'.tr);
      return;
    }

    if (this.selectedSpecialization.length == 0) {
      showError('error'.tr, 'prefSpecEmpty_error'.tr);
      return;
    }

    if (availabilityIndex == 0) {
      showError('error'.tr, 'availbilityEmpty_error'.tr);
      return;
    }

    isValidToSubmitStepOne.value = true;
  }

  uploadStepOne() {
    checkValidStepOne();
    if (isValidToSubmitStepOne.value) {
      submitPreference();
    }
  }

  Future submitPreference() async {
    this.isApiLoading.value = true;

    var data = {
      'salary_range_from': salaryRange.value.start.toInt(),
      'salary_range_to': salaryRange.value.end.toInt(),
      'job_category_id':
          configService.getSpecializationListKeyByValue(selectedSpecialization)
    };

    var json = await apiService.submitPreference(data);
    if (json['status_code'] == 200 || json['status_code'] == 201) {
      uploadMe();
    }
  }

  Future uploadMe() async {
    var params = {
      'country_key': "ph",
      'location_key': configService.getLocationKeyByValue(location.value),
      'notice_period_id': availabilityIndex,
      'phone_num': phone.value
    };

    var json = await apiService.uploadMe(params);
    if (json['status_code'] == 200 || json['status_code'] == 201) {
      appController.getUserProfile();
      setStepTwoInitValue();

      setCurPage(curPage.value + 1);
    }
    this.isApiLoading.value = false;
  }

  updateSeletedJobName(val) {
    selectedJob.value.name = val;
  }

  updateSeletedCompanyName(val) {
    selectedCompany.value.name = val;
  }

  updateSeletedCompany(val) {
    selectedCompany.value = val;
    // reset filter data
    companyFilterModel.value = new CompanyFilterModel();
  }

  removeSeletedCompany() {
    selectedCompany.value = CompanyFilterModelDataCompanies();
  }

  setLocationWorkingExp(v) {
    locationWorkingExp.value = v;
  }

  setIndustry(v) {
    industry.value = v;
  }

  setSalaryWorkingExp(v) {
    salaryWorkingExp.value = v;
  }

  setStartDate(v) {
    startDate.value = v;
  }

  setEndDate(v) {
    endDate.value = v;
  }

  setCheckboxWorkingExp(v) {
    checkboxWorkingExp.value = v;
    setEndDate(DateFormat("yyyy-MM-dd").format(DateTime.now()));
  }

  Future searchJob(query) async {
    EasyDebounce.debounce(
      'searchJob-debouce',
      Duration(milliseconds: 1000),
      () async {
        jobLoading.value = true;
        var json = await apiService.jobTitleFilter(query);
        jobFilterModel.value = JobTitleFilterModel.fromJson(json);
        jobLoading.value = false;
      },
    );
  }

  Future searchCompany(query) async {
    EasyDebounce.debounce(
      'searchCompany-debouce',
      Duration(milliseconds: 1000),
      () async {
        companyLoading.value = true;
        var json = await apiService.companyFilter(query);
        companyFilterModel.value = CompanyFilterModel.fromJson(json);
        companyLoading.value = false;
      },
    );
  }

  checkValidStepTwo() {
    isValidToSubmitStepTwo.value = false;

    if (selectedJob.value.name == null || selectedJob.value.name == '') {
      showError('error'.tr, 'jobTitleEmpty_error'.tr);
      return;
    }

    // check category at least one
    if (this.selectedSpecializationWorkingExp.length == 0) {
      showError('error'.tr, 'prefSpecEmpty_error'.tr);
      return;
    }
    if (selectedCompany.value.name == null ||
        selectedCompany.value.name == '') {
      showError('error'.tr, 'comNameEmpty_error'.tr);
      return;
    }
    if (locationWorkingExp.value == '') {
      showError('error'.tr, 'locationEmpty_error'.tr);
      return;
    }

    if (industry.value == '') {
      showError('error'.tr, 'industryEmpty_error'.tr);
      return;
    }
    if (salaryWorkingExp.value == '0' || salaryWorkingExp.value == '') {
      showError('error'.tr, 'salaryEmpty_error'.tr);
      return;
    }
    if (startDate.value == '') {
      String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
      setStartDate(date);
    }
    if (checkboxWorkingExp.value == false) {
      if (endDate.value == '') {
        String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
        setEndDate(date);
      }

      if (startDate.value != '' && endDate.value != '') {
        DateTime date1 = DateTime.parse(startDate.value);
        DateTime date2 = DateTime.parse(endDate.value);

        if (date2.difference(date1).isNegative) {
          showError('error'.tr, 'endAfterStartDate_error'.tr);
          return;
        }
      }
    }

    isValidToSubmitStepTwo.value = true;
  }

  uploadStepTwo() {
    checkValidStepTwo();
    if (isValidToSubmitStepTwo.value) {
      submitWorkingExp();
    }
  }

  Future submitWorkingExp() async {
    this.isApiLoading.value = true;

    var params = {
      'company': selectedCompany.value.name,
      'company_industry_key':
          configService.getIndustryKeyByValue(industry.value),
      'country_key': "ph",
      'isDeleteThisWork': false,
      'is_currently_work_here': checkboxWorkingExp.value == true ? 1 : 0,
      'job_category_id': configService
          .getSpecializationListKeyByValue(selectedSpecializationWorkingExp),
      'job_title': selectedJob.value.name,
      'location_key':
          configService.getLocationKeyByValue(locationWorkingExp.value),
      'salary': int.parse(salaryWorkingExp.value),
      'working_period_from': startDate.value,
      'working_period_to': endDate.value,
    };

    var json;
    if (appController.userInfo.value.data!.latestWorkXp != null &&
        appController.userInfo.value.data!.latestWorkXp!.id != null) {
      json = await apiService.updateWorkExp(
          appController.userInfo.value.data!.latestWorkXp!.id, params);
    } else {
      json = await apiService.submitWorkingExp(params);
    }
    if (json['status_code'] == 200 || json['status_code'] == 201) {
      appController.getUserProfile();
      setStepThreeInitValue();
      setCurPage(curPage.value + 1);
    }
    this.isApiLoading.value = false;
  }

  Future searchSchool(query) async {
    EasyDebounce.debounce(
      'searchSchool-debouce',
      Duration(milliseconds: 1000),
      () async {
        schoolLoading.value = true;
        var json = await apiService.schoolFilter(query);
        schoolFilterModel.value = SchoolFilterModel.fromJson(json);
        schoolLoading.value = false;
      },
    );
  }

  updateSeletedSchool(val) {
    selectedSchool.value = val;
    // reset filter data
    schoolFilterModel.value = new SchoolFilterModel();
  }

  removeSeletedSchool() {
    selectedSchool.value = SchoolFilterModelDataSchools();
  }

  setStudyFeild(v) {
    this.studyField.value = v;
  }

  setEducation(v) {
    education.value = v;
  }

  setStartDateEdu(v) {
    startDateEdu.value = v;
  }

  setEndDateEdu(v) {
    endDateEdu.value = v;
  }

  setCheckboxEdu(v) {
    checkboxEdu.value = v;
    setEndDateEdu(DateFormat("yyyy-MM-dd").format(DateTime.now()));
  }

  setLocationEdu(v) {
    this.locationEdu.value = v;
  }

  updateSeletedSchoolName(val) {
    selectedSchool.value.name = val;
  }

  checkValidStepThree() {
    isValidToSubmitStepThree.value = false;

    if (selectedSchool.value.name == null || selectedSchool.value.name == '') {
      showError('error'.tr, 'schoolEmpty_error'.tr);
      return;
    }
    if (studyField.value == '') {
      showError('error'.tr, 'fieldStudyEmpty_error'.tr);
      return;
    }
    if (education.value == '') {
      showError('error'.tr, 'eduLvlEmpty_error'.tr);
      return;
    }

    if (locationEdu.value == '') {
      showError('error'.tr, 'locationEmpty_error'.tr);
      return;
    }
    if (startDateEdu.value == '') {
      String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
      setStartDateEdu(date);
    }
    if (checkboxEdu.value == false) {
      if (endDateEdu.value == '') {
        String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
        setEndDateEdu(date);
      }

      if (startDateEdu.value != '' && endDateEdu.value != '') {
        DateTime date1 = DateTime.parse(startDateEdu.value);
        DateTime date2 = DateTime.parse(endDateEdu.value);

        if (date2.difference(date1).isNegative) {
          showError('error'.tr, 'endAfterStartDate_error'.tr);
          return;
        }
      }
    }
    isValidToSubmitStepThree.value = true;
  }

  uploadStepThree() {
    checkValidStepThree();
    if (isValidToSubmitStepThree.value) {
      submitEducationExp();
    }
  }

  Future submitEducationExp() async {
    this.isApiLoading.value = true;

    var params = {
      'country_key': "ph",
      'degree_key': education.value = education.value.toLowerCase(),
      'field_of_study': studyField.value,
      'is_currently_studying': checkboxEdu.value == true ? 1 : 0,
      'location_key': configService.getLocationKeyByValue(locationEdu.value),
      'school': selectedSchool.value.name,
      'study_period_from': startDateEdu.value,
      'study_period_to': endDateEdu.value,
    };
    var json;
    if (appController.userInfo.value.data!.latestEducation != null &&
        appController.userInfo.value.data!.latestEducation!.id != null) {
      json = await apiService.updateEducationExp(
          appController.userInfo.value.data!.latestEducation!.id, params);
    } else {
      json = await apiService.submitEducationExp(params);
    }
    if (json['status_code'] == 200 || json['status_code'] == 201) {
      showVerifyEmail(callback: (success) {
        if (success == 'changeEmail') {
          Get.back();
          Future.delayed(Duration(milliseconds: 500), () {
            Get.toNamed('/editEmail');
          });
          return;
        }
        if (success) {
          completeProfile();
          Get.back();
        }
      });
    }
    this.isApiLoading.value = false;
  }

  setApplyMessage(v) {
    this.applyMessage.value = v;
  }

  setQuestionAnwser(v, idx) {
    this.answer[idx] = v;
  }

  Future completeProfile() async {
    var data = {'is_generate_resume': isAutoGenerateResume.value};
    var json = await apiService.completeProfile(data);
    if (json['status_code'] == 200 || json['status_code'] == 201) {
      appController.getUserProfile();
    }
  }

  Future submitJobApplication(id, location, type) async {
    if (!appController.userInfo.value.data!.isEmailVerify!) {
      showError('error'.tr, 'verifyEmail_error'.tr);
      showVerifyEmail(callback: (success) {
        if (success) {
          Get.back();
          appController.getUserProfile();
        }
      });
      return;
    }
    this.isApplyApplicationLoading.value = true;
    if (this.applyMessage.value == '') {
      showError('error'.tr, 'messageEmpty_error'.tr);
      return;
    }
    Map<String, dynamic> params = {'source': 'app'};

    if (applyMessage.value.isNotEmpty) {
      params['first_message'] = applyMessage.value;
    }
    if (answer.length > 0) {
      print(answer);
      answer.removeWhere((element) => element.isEmpty);
      params['screening_answers'] = answer;
    } else {
      params['first_message'] = 'my resume';
    }
    var json = await apiService.submitJobApplication(id, params);
    if (json['status_code'] == 200 || json['status_code'] == 201) {
      this.isApplyApplicationLoading.value = false;
      AnalyticsService()
          .applyJobSuccess(id: id, type: type, location: location);
      Get.back();
      showSuccess('success'.tr, 'jobAppliedSuccess'.tr);
    }
    if (json['status_code'] == 422) {
      showError('error'.tr, json['data'][0]['message'].toString());
    }
    this.isApplyApplicationLoading.value = false;
  }

  @override
  void dispose() {
    EasyDebounce.cancel('searchJob-debouce');
    EasyDebounce.cancel('searchCompany-debouce');
    EasyDebounce.cancel('searchSchool-debouce');
    super.dispose();
  }
}
