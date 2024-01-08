import 'package:bossjobapp/Constants/constant.dart';
import 'package:bossjobapp/Controllers/AuthController.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:get/get.dart';

class EditPasswordController extends BaseController {
  RxString currentPwd = ''.obs;
  RxString newPwd = ''.obs;
  RxString confirmPwd = ''.obs;
  RxBool isSubmit = false.obs;

  setCurrentPwd(val) {
    this.currentPwd.value = val;
    checkSubmitButton();
  }

  setNewPwd(val) {
    this.newPwd.value = val;
    checkSubmitButton();
  }

  setconfirmPwd(val) {
    this.confirmPwd.value = val;
    checkSubmitButton();
  }

  checkSubmitButton() {
    this.isSubmit.value = false;
    if (currentPwd.value.length < 8) {
      return;
    }
    if (newPwd.value.length < 8) {
      return;
    }
    if (confirmPwd.value.length < 8) {
      return;
    }
    this.isSubmit.value = true;
  }

  Future submitPwdReset(login) async {
    if (!isSubmit.value) {
      return;
    }

    if (confirmPwd.value != newPwd.value) {
      showError('error'.tr, 'newPasswordNotSame_error'.tr);
      return;
    }

    var data = {
      'client_id': client_id,
      'client_secret': client_secret,
      'login': login,
      'new_password': newPwd.value,
      'old_password': currentPwd.value,
    };

    var json = await apiService.submitChangePasswordRequest(data);

    if (json['success'] == true) {
      AnalyticsService().updateAccount("password");
      showSuccess('success'.tr, 'passChangedSuccess'.tr);

      Future.delayed(
        Duration(
          milliseconds: 1500,
        ),
        () {
          AuthController authController = Get.find();
          authController.forceLogout();
        },
      );
    }

    if (json['status_code'] == 422 || json['status_code'] == 404) {
      // print(json['data'][0]['message']);
      showError('error'.tr, json['data'][0]['message'].toString());
    }

    if (json['message'] == "") {
      showError('error'.tr, 'somethingWrong_error'.tr);
    }
  }
}
