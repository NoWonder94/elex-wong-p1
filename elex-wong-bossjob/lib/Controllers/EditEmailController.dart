import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:get/get.dart';

class EditEmailController extends BaseController {
  RxString newEmail = ''.obs;
  RxString verificationCode = ''.obs;
  RxBool isEmailConfirm = false.obs;
  RxBool isVerificationConfirm = false.obs;
  RxBool isSubmit = false.obs;
  RxBool isHintShow = false.obs;

  @override
  void onInit() async {
    super.onInit();
  }

  setNewEmail(val) {
    this.newEmail.value = val;
  }

  setVarificationCode(val) {
    this.verificationCode.value = val;
    checkSubmitValid();
  }

  checkSubmitValid() {
    this.isSubmit.value = false;
    if (!isEmailConfirm.value) {
      return;
    }
    if (verificationCode.value.length < 6) {
      return;
    }
    this.isSubmit.value = true;
  }

  // click resend button
  checkEmailValid() {
    if (newEmail.value == '') {
      this.isEmailConfirm.value = false;
      checkSubmitValid();
      showError('error'.tr, 'emailEmpty_error'.tr);
      return;
    }

    bool emailValid = RegExp(
            r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
        .hasMatch(newEmail.value);

    if (emailValid) {
      getOtpRequest();
      this.isEmailConfirm.value = true;
      checkSubmitValid();
    } else {
      showError('error'.tr, 'emailInvalid_error'.tr);
      this.isEmailConfirm.value = false;
      checkSubmitValid();
      this.isHintShow.value = false;
    }

    // print('isEmailConfirm.value: ' + isEmailConfirm.value.toString());
    // print('isSubmit.value: ' + isSubmit.value.toString());
  }

  // request OTP from email
  Future getOtpRequest() async {
    var data = {
      'login': newEmail.value,
      'country_key': "ph",
    };
    var json = await apiService.getEditVerificationCode(data);
    if (json['status_code'] == 201) {
      showSuccess('otpSent'.tr, json['data']['message']);
      this.isHintShow.value = true;
    }
    if (json['status_code'] == 429) {
      showError(
        json['error']['message'],
        "Retry after " + json['error']['retry_after'].toString() + " seconds.",
      );
    }
  }

  // submit reset button
  Future submitResetEmail(oldEmail) async {
    if (!isSubmit.value) {
      return;
    }
    // print(oldEmail);

    var data = {
      'login': oldEmail,
      'new_email': newEmail.value,
      'otp': verificationCode.value,
    };

    var json = await apiService.submitChangeEmailRequest(data);

    if (json['message'] == "OK" && json['status_code'] == 200) {
      AnalyticsService().updateAccount("email");
      showSuccess('success'.tr, "emailChangedSuccess".tr);

      AppController appController = Get.find();
      appController.getUserProfile();
      this.isHintShow.value = false;

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
