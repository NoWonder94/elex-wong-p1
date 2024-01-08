import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:get/get.dart';

class EditMobileController extends BaseController {
  RxString newCountryKey = ''.obs;
  RxString newMobileCode = ''.obs;
  RxString newMobile = ''.obs;
  RxString verificationCode = ''.obs;
  RxBool isSubmit = false.obs;

  @override
  void onInit() async {
    super.onInit();
  }

  setNewCountryKey(val) {
    this.newCountryKey.value = val;
    checkSubmitValid();
  }

  setNewMobileCode(val) {
    this.newMobileCode.value = val;
    checkSubmitValid();
  }

  setNewMobile(val) {
    this.newMobile.value = val;
    checkSubmitValid();
  }

  setVarificationCode(val) {
    this.verificationCode.value = val;
    checkSubmitValid();
  }

  checkSubmitValid() {
    this.isSubmit.value = false;
    if (newMobileCode.value == '') {
      return;
    }
    if (newMobile.value == '') {
      return;
    }
    if (newCountryKey.value == '') {
      return;
    }
    if (verificationCode.value.length < 6) {
      return;
    }
    this.isSubmit.value = true;
  }

  // request OTP from mobile
  Future getOtpRequest() async {
    if (newMobile.value == '') {
      showError('error'.tr, 'mobileEmpty_error'.tr);
      return;
    }
    var data = {
      'login': newMobileCode.value + newMobile.value,
      'country_key': newCountryKey.value,
    };
    var json = await apiService.getEditVerificationCode(data);
    if (json['status_code'] == 201) {
      showSuccess('otpSent'.tr, json['data']['message']);
    }
    if (json['status_code'] == 422) {
      // print(json['data'][0]['message']);
      showError('error'.tr, json['data'][0]['message'].toString());
    }
    if (json['status_code'] == 429) {
      showError(
        json['error']['message'],
        "Retry after " + json['error']['retry_after'].toString() + " seconds.",
      );
    }
  }

  // submit reset phone number
  Future submitResetPhone(userEmail) async {
    if (!isSubmit.value) {
      return;
    }

    var data = {
      'login': userEmail,
      'new_phone_num': newMobileCode.value + newMobile.value,
      'otp': verificationCode.value,
    };

    var json = await apiService.submitChangePhoneRequest(data);

    if (json['message'] == "OK" && json['status_code'] == 200) {
      AnalyticsService().updateAccount("mobile");
      showSuccess('success'.tr, "phoneChangedSuccess".tr);

      AppController appController = Get.find();
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

    if (json['status_code'] == 422 || json['status_code'] == 404) {
      showError('error'.tr, json['data'][0]['message'].toString());
    }

    if (json['message'] == "") {
      showError('error'.tr, 'somethingWrong_error'.tr);
    }
  }
}
