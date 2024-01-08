import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Models/CompanyFilterModel.dart';
import 'package:bossjobapp/Models/JobTitleFilterModel.dart';
import 'package:bossjobapp/Models/UserProfileModel.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:easy_debounce/easy_debounce.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

class EditWorkExpController extends BaseController {
  AppController appController = Get.find();
  ConfigService configService = Get.find();

  RxBool jobLoading = false.obs;
  Rx<JobTitleFilterModel> jobTitleFilterModel = new JobTitleFilterModel().obs;
  Rx<JobTitleFilterModelDataJobs> selectedJob =
      JobTitleFilterModelDataJobs().obs;

  RxList<String> selectedSpecializationWorkingExp =
      new List<String>.empty().obs;

  RxBool companyLoading = false.obs;
  Rx<CompanyFilterModel> companyFilterModel = new CompanyFilterModel().obs;
  Rx<CompanyFilterModelDataCompanies> selectedCompany =
      new CompanyFilterModelDataCompanies().obs;

  RxString locationWorkingExp = ''.obs;
  RxString industry = ''.obs;
  RxString salaryWorkingExp = ''.obs;
  RxString startDate = ''.obs;
  RxString endDate = ''.obs;
  RxBool checkboxWorkingExp = false.obs;
  RxString description = ''.obs;
  RxBool isSubmit = false.obs;
  RxBool isApiLoading = false.obs;

  Rx<UserProfileModelDataWorkXps> workingInfo =
      new UserProfileModelDataWorkXps().obs;

  @override
  void onInit() async {
    super.onInit();
  }

  /* get workexp id */
  Future getUserWorkExp(workId) async {
    this.isApiLoading.value = true;
    var json = await apiService.getWorkExp(workId);

    if (json['status_code'] == 200 && json['message'] == "OK") {
      workingInfo.value = UserProfileModelDataWorkXps.fromJson(json['data']);

      // print(json['data']['categories'].length);
      if (json['data']['categories'].length > 0) {
        var specializationList = json['data']['categories'];
        specializationList.forEach((key, value) {
          updateSelectedSpecializationWorkingExp(value);
        });
      }
    }

    setInitialValue();
    this.isApiLoading.value = false;
  }

  setInitialValue() {
    if (workingInfo.value.jobTitle != null) {
      updateSeletedJobTitle(workingInfo.value.jobTitle);
    }

    if (workingInfo.value.company != null) {
      updateSeletedCompanyName(workingInfo.value.company);
    }

    if (workingInfo.value.location != null) {
      setLocationWorkingExp(workingInfo.value.location);
    }

    if (workingInfo.value.companyIndustry != null) {
      setIndustry(workingInfo.value.companyIndustry);
    }

    if (workingInfo.value.salary != 0) {
      setSalaryWorkingExp(workingInfo.value.salary);
    }

    if (workingInfo.value.workingPeriodFrom != null) {
      setStartDate(workingInfo.value.workingPeriodFrom);
    } else {
      String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
      setStartDate(date);
    }

    if (workingInfo.value.workingPeriodTo != null) {
      setEndDate(workingInfo.value.workingPeriodTo);
    } else {
      String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
      setEndDate(date);
    }

    if (workingInfo.value.description != null) {
      setDescription(workingInfo.value.description);
    }

    setCheckboxWorkingExp(workingInfo.value.isCurrentlyWorkHere);
  }
  /* get workexp id */

  /* job title */
  updateSeletedJob(val) {
    selectedJob.value = val;
    // reset filter data
    jobTitleFilterModel.value = new JobTitleFilterModel();
  }

  removeSeletedJob() {
    selectedJob.value = JobTitleFilterModelDataJobs();
  }

  updateSeletedJobTitle(val) {
    selectedJob.value.name = val;
  }

  Future searchJob(query) async {
    EasyDebounce.debounce(
      'searchJobTitle-debouce',
      Duration(milliseconds: 1000),
      () async {
        jobLoading.value = true;
        var json = await apiService.jobTitleFilter(query);
        jobTitleFilterModel.value = JobTitleFilterModel.fromJson(json);
        jobLoading.value = false;
      },
    );
  }
  /* job title */

  /* specialization */
  removeSelectedSpecializationWorkingExp(val) {
    selectedSpecializationWorkingExp.remove(val);
  }

  updateSelectedSpecializationWorkingExp(val) {
    selectedSpecializationWorkingExp.addIf(
        !selectedSpecializationWorkingExp.contains(val), val);
  }
  /* specialization */

  /* company name */
  updateSeletedCompanyName(val) {
    selectedCompany.value.name = val;
  }

  removeSeletedCompany() {
    selectedCompany.value = CompanyFilterModelDataCompanies();
  }

  updateSeletedCompany(val) {
    selectedCompany.value = val;
    // reset filter data
    companyFilterModel.value = new CompanyFilterModel();
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
  /* company name */

  /* location */
  setLocationWorkingExp(v) {
    locationWorkingExp.value = v;
  }
  /* location */

  /* industry */
  setIndustry(v) {
    industry.value = v;
  }
  /* industry */

  /* Salary */
  setSalaryWorkingExp(v) {
    salaryWorkingExp.value = v.toString();
  }
  /* Salary */

  /* work Period */
  setStartDate(v) {
    startDate.value = v;
  }

  setEndDate(v) {
    endDate.value = v;
  }

  setCheckboxWorkingExp(v) {
    this.checkboxWorkingExp.value = v;
    setEndDate(DateFormat("yyyy-MM-dd").format(DateTime.now()));
  }
  /* work Period */

  /* description */
  setDescription(v) {
    description.value = v;
  }
  /* description */

  /* validation */
  checkValidation() {
    this.isSubmit.value = false;
    if (selectedJob.value.name == null || selectedJob.value.name == '') {
      showError('error'.tr, 'jobTitleEmpty_error'.tr);
      return;
    }

    if (this.selectedSpecializationWorkingExp.length == 0) {
      showError('error'.tr, 'jobSpecEmpty_error'.tr);
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
    // if (salaryWorkingExp.value == '0' || salaryWorkingExp.value == '') {
    //   showError('error'.tr, 'Salary cannot be empty');
    //   return;
    // }
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

      if (startDate.value == endDate.value) {
        showError('error'.tr, 'endAfterStartDate_error'.tr);
        return;
      }
    }
    this.isSubmit.value = true;
  }
  /* validation */

  /* update */
  Future updateWorkingExp(workId) async {
    checkValidation();

    if (isSubmit.value) {
      this.isApiLoading.value = true;

      var params = {
        'company': selectedCompany.value.name,
        'company_industry_key':
            configService.getIndustryKeyByValue(industry.value),
        'country_key': "ph",
        'description': description.value,
        'isDeleteThisWork': false,
        'is_currently_work_here': checkboxWorkingExp.value == true ? 1 : 0,
        'job_category_id': configService
            .getSpecializationListKeyByValue(selectedSpecializationWorkingExp),
        'job_title': selectedJob.value.name,
        'location_key':
            configService.getLocationKeyByValue(locationWorkingExp.value),
        'salary': salaryWorkingExp.value == ''
            ? ''
            : int.parse(salaryWorkingExp.value),
        'working_period_from': startDate.value,
        'working_period_to': endDate.value,
      };

      var json = await apiService.updateWorkExp(workId, params);

      if (json['status_code'] == 200 || json['status_code'] == 201) {
        AnalyticsService().updateResume("work-exp");
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
      this.isApiLoading.value = false;
    }
  }

  /* submit */
  Future submitWorkingExp() async {
    checkValidation();
    if (isSubmit.value) {
      this.isApiLoading.value = true;

      var params = {
        'company': selectedCompany.value.name,
        'company_industry_key':
            configService.getIndustryKeyByValue(industry.value),
        'country_key': "ph",
        'description': description.value,
        'isDeleteThisWork': false,
        'is_currently_work_here': checkboxWorkingExp.value == true ? 1 : 0,
        'job_category_id': configService
            .getSpecializationListKeyByValue(selectedSpecializationWorkingExp),
        'job_title': selectedJob.value.name,
        'location_key':
            configService.getLocationKeyByValue(locationWorkingExp.value),
        'salary': salaryWorkingExp.value == ''
            ? ''
            : int.parse(salaryWorkingExp.value),
        'working_period_from': startDate.value,
        'working_period_to': endDate.value,
      };

      var json = await apiService.submitWorkingExp(params);
      if (json['status_code'] == 200 || json['status_code'] == 201) {
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

      if (json['status_code'] > 400) {
        showError('error'.tr, json['data'][0]['message'].toString());
      }
      this.isApiLoading.value = false;
    }
  }

  @override
  void dispose() {
    EasyDebounce.cancel('searchJobTitle-debouce');
    EasyDebounce.cancel('searchCompany-debouce');
    super.dispose();
  }
}
