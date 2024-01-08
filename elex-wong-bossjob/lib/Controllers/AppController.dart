import 'dart:async';
import 'package:bossjobapp/Controllers/AuthController.dart';
import 'package:bossjobapp/Models/UserProfileModel.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:get/get.dart';
import 'package:bossjobapp/Constants/common.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';

class AppController extends BaseController {
  RxInt tabIndex = 0.obs;
  RxString verifyCode = ''.obs;
  RxBool isSendVerifyCodeLoading = false.obs;
  RxBool isVerifyEmailLoading = false.obs;
  RxBool isUserInfoLoading = false.obs;
  Rx<UserProfileModel> userInfo = new UserProfileModel().obs;

  @override
  void onInit() async {
    AuthController authController = Get.find();
    if (authController.isLogin()) {
      getUserProfile();
    }
    super.onInit();
  }

  //切换页面
  void setTabIndex(index) {
    this.tabIndex.value = index;
  }

  //刷新页面
  Future refresh() async {
    Completer<Null> completer = new Completer<Null>();
    new Future.delayed(new Duration(seconds: 1)).then((_) {
      completer.complete();
    });

    return completer.future;
  }

  //显示验证界面
  void showVerifyLayout() {
    showVerifyEmail();
  }

  //发送验证
  Future sendVerifyCode() async {
    if (this.isSendVerifyCodeLoading.value == true) {
      return false;
    }
    if (this.isVerifyEmailLoading.value == true) {
      return false;
    }

    this.isSendVerifyCodeLoading.value = true;
    var result = await apiService.sendVerifyCode();
    if (result['status_code'] == 200) {
      showSuccess('success'.tr, result['data']['message']);
    } else {
      showError('error'.tr, result['data'][0]['message'][0]);
    }
    this.isSendVerifyCodeLoading.value = false;
  }

  //验证邮箱
  Future verifyEmail({callback}) async {
    if (this.isVerifyEmailLoading.value == true) {
      return false;
    }

    if (this.verifyCode.value == '') {
      showError('error'.tr, 'verifyCodeEmpty_error'.tr);
      return false;
    }

    this.isVerifyEmailLoading.value = true;
    var params = {
      'code': this.verifyCode.value,
    };
    var result = await apiService.verifyEmail(params);
    if (result['status_code'] == 200) {
      Get.back();
      callback(true);
      showSuccess('success'.tr, result['data']['message']);
    } else {
      callback(false);
      showError('error'.tr, result['data'][0]['message'][0]);
    }
    this.isVerifyEmailLoading.value = false;
  }

  // 获取用户资料
  Future getUserProfile() async {
    this.isUserInfoLoading.value = true;
    var result = await apiService.getUserInfo();
    if (result['status_code'] == 200 && result['message'] == "OK") {
      userInfo.value = UserProfileModel.fromJson(result);
      var userId = userInfo.value.data!.id;
      var userAvatar = userInfo.value.data!.avatar;
      AnalyticsService().setId(userId);
      await prefs.setInt('user_id', userId!);
      if (userAvatar != null) {
        await prefs.setString('user_avatar', userAvatar);
      }
    }
    this.isUserInfoLoading.value = false;
  }

  int? getUserId() {
    return prefs.getInt('user_id');
  }

  String? getUserAvatar() {
    return prefs.getString('user_avatar');
  }

  Future deactivateAccount() async {
    await apiService.deactivateAccount();
    AuthController authController = Get.find();
    authController.forceLogout();
  }
}
