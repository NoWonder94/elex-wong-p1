import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:bossjobapp/Services/UploadService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

class ProfileUpdateController extends BaseController {
  ConfigService configService = Get.find();
  AppController appController = Get.find();
  UploadService uploadService = Get.put(UploadService());

  RxBool aloading = false.obs;
  RxString birthdate = ''.obs;
  RxString description = ''.obs;
  RxString firstName = ''.obs;
  RxString lastName = ''.obs;
  RxString locationKey = ''.obs;
  int noticePeriod = 0;
  RxString experience = ''.obs;
  RxBool isValidToSubmit = false.obs;
  @override
  void onInit() async {
    if (appController.userInfo.value.data!.firstName != '') {
      setFirstName(appController.userInfo.value.data!.firstName);
    }

    if (appController.userInfo.value.data!.lastName != '') {
      setLastName(appController.userInfo.value.data!.lastName);
    }

    if (appController.userInfo.value.data!.birthdate != null) {
      setBirthdate(appController.userInfo.value.data!.birthdate);
    }

    if (appController.userInfo.value.data!.location != null) {
      setLocationKey(appController.userInfo.value.data!.location);
    }

    if (appController.userInfo.value.data!.xpLvl != null) {
      setExperience(appController.userInfo.value.data!.xpLvl);
    }

    if (appController.userInfo.value.data!.noticePeriodId != 0) {
      setNoticePeriod(appController.userInfo.value.data!.noticePeriodId);
    }

    if (appController.userInfo.value.data!.description != null) {
      setDescription(appController.userInfo.value.data!.description);
    }

    super.onInit();
  }

  setBirthdate(v) {
    birthdate.value = v;
  }

  setDescription(v) {
    description.value = v;
  }

  setFirstName(v) {
    firstName.value = v;
  }

  setLastName(v) {
    lastName.value = v;
  }

  setLocationKey(v) {
    locationKey.value = v;
  }

  setNoticePeriod(v) {
    noticePeriod = v;
  }

  setExperience(v) {
    experience.value = v;
  }

  checkValidation() {
    isValidToSubmit.value = false;
    if (firstName.value == '') {
      showError('error'.tr, 'firstNameEmpty_error'.tr);
      return;
    }

    if (lastName.value == '') {
      showError('error'.tr, 'lastNameEmpty_error'.tr);
      return;
    }

    if (birthdate.value == '') {
      String date = DateFormat("yyyy-MM-dd").format(DateTime.now());
      setBirthdate(date);
    }

    if (locationKey.value == '') {
      showError('error'.tr, 'locationEmpty_error'.tr);
      return;
    }

    if (experience.value == '') {
      showError('error'.tr, 'expYrsEmpty_error'.tr);
      return;
    }

    if (noticePeriod == 0) {
      showError('error'.tr, 'availbilityEmpty_error'.tr);
      return;
    }
    // if (description.value == '') {
    //     showError('error'.tr, 'Description cannot be empty');
    //     return;
    // }
    isValidToSubmit.value = true;
  }

  Future uploadMe() async {
    checkValidation();
    if (isValidToSubmit.value) {
      var params = {
        'birthdate': birthdate.value,
        'country_key': "ph",
        'description': description.value,
        'first_name': firstName.value,
        'last_name': lastName.value,
        'location_key': configService.getLocationKeyByValue(locationKey.value),
        'notice_period_id': noticePeriod,
        'xp_lvl_key': configService.getExperienceKeyByValue(experience.value)
      };

      var json = await apiService.uploadMe(params);
      if (json['status_code'] == 200 || json['status_code'] == 201) {
        AnalyticsService().updateResume("profile");
        showSuccess('success'.tr, 'profileUpdateSuccess'.tr);
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
    }
  }

  uploadAvatar() {
    uploadService.upload(
      type: UploadType.AVATAR,
      onLoading: () {
        aloading.value = true;
      },
      onSuccess: (fileName) {
        // filename.value = fileName;
        aloading.value = false;
        showSuccess('success'.tr, 'avatarUpdated'.tr);
        appController.getUserProfile();
      },
      onFailed: (error) {
        aloading.value = false;
        showError('Failed', error);
      },
    );
  }
}
