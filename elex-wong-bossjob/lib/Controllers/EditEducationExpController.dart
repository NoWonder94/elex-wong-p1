import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Models/SchoolFilterModel.dart';
import 'package:bossjobapp/Models/UserProfileModel.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:easy_debounce/easy_debounce.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

class EditEducationExpController extends BaseController {
  ConfigService configService = Get.find();
  AppController appController = Get.find();
  RxBool schoolLoading = false.obs;
  Rx<SchoolFilterModel> schoolFilterModel = new SchoolFilterModel().obs;
  Rx<SchoolFilterModelDataSchools> selectedSchool =
      new SchoolFilterModelDataSchools().obs;

  RxString studyField = ''.obs;
  RxString education = ''.obs;
  RxString locationEdu = ''.obs;
  RxString startDateEdu = ''.obs;
  RxString endDateEdu = ''.obs;
  RxBool checkboxEdu = false.obs;
  RxBool isApiLoading = false.obs;
  RxBool isValidToSubmit = false.obs;

  Rx<UserProfileModelDataEducations> educationsInfo =
      new UserProfileModelDataEducations().obs;

  setInitialValue() {
    if (educationsInfo.value.school != null) {
      updateSeletedSchoolName(educationsInfo.value.school);
    }
    if (educationsInfo.value.fieldOfStudy != null) {
      setStudyFeild(educationsInfo.value.fieldOfStudy);
    }
    if (educationsInfo.value.degree != null) {
      setEducation(educationsInfo.value.degree);
    }
    if (educationsInfo.value.location != null) {
      setLocationEdu(educationsInfo.value.location);
    }

    if (educationsInfo.value.studyPeriodFrom != null) {
      setStartDateEdu(educationsInfo.value.studyPeriodFrom);
    } else {
      String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
      setStartDateEdu(date);
    }

    if (educationsInfo.value.studyPeriodTo != null) {
      setEndDateEdu(educationsInfo.value.studyPeriodTo);
    } else {
      String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
      setEndDateEdu(date);
    }

    if (educationsInfo.value.isCurrentlyStudying == 1) {
      setCheckboxEdu(true);
    }
  }

  Future getUserEducationInfo(educationId) async {
    this.isApiLoading.value = true;
    var json = await apiService.getEducationExp(educationId);
    if (json['status_code'] == 200 && json['message'] == "OK") {
      educationsInfo.value =
          UserProfileModelDataEducations.fromJson(json['data']);
    }
    setInitialValue();
    this.isApiLoading.value = false;
  }

  updateSeletedSchool(val) {
    selectedSchool.value = val;
    // reset filter data
    schoolFilterModel.value = new SchoolFilterModel();
  }

  removeSeletedSchool() {
    updateSeletedSchoolName('');
    selectedSchool.value = SchoolFilterModelDataSchools();
  }

  setStudyFeild(v) {
    studyField.value = v;
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
    locationEdu.value = v;
  }

  updateSeletedSchoolName(val) {
    selectedSchool.value.name = val;
  }

  Future searchSchoolFilter(query) async {
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

  checkValidation() {
    isValidToSubmit.value = false;

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

        if (startDateEdu.value == endDateEdu.value) {
          showError('error'.tr, 'endAfterStartDate_error'.tr);
          return;
        }
      }
    }

    isValidToSubmit.value = true;
  }

  Future updateEducation(eduId) async {
    checkValidation();

    if (isValidToSubmit.value) {
      this.isApiLoading.value = true;

      var params = {
        'country_key': "ph",
        'degree_key': education.value.toLowerCase(),
        'field_of_study': studyField.value,
        'is_currently_studying': checkboxEdu.value == true ? 1 : 0,
        'location_key': configService.getLocationKeyByValue(locationEdu.value),
        'school': selectedSchool.value.name,
        'study_period_from': startDateEdu.value,
        'study_period_to': endDateEdu.value,
      };

      var json = await apiService.updateEducationExp(eduId, params);

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
      this.isApiLoading.value = false;
    }
  }

  /* submit */
  Future submitEducation() async {
    checkValidation();
    if (isValidToSubmit.value) {
      this.isApiLoading.value = true;

      var params = {
        'country_key': "ph",
        'degree_key': education.value.toLowerCase(),
        'field_of_study': studyField.value,
        'is_currently_studying': checkboxEdu.value == true ? 1 : 0,
        'location_key': configService.getLocationKeyByValue(locationEdu.value),
        'school': selectedSchool.value.name,
        'study_period_from': startDateEdu.value,
        'study_period_to': endDateEdu.value,
      };
      var json = await apiService.submitEducationExp(params);

      if (json['status_code'] == 200 || json['status_code'] == 201) {
        AnalyticsService().updateResume("edu");
        showSuccess('success'.tr, 'createSuccess'.tr);
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

  @override
  void dispose() {
    EasyDebounce.cancel('searchSchool-debouce');
    super.dispose();
  }
}
