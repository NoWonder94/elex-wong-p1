import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Models/UserProfileModel.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:get/get.dart';

class ProfileController extends BaseController {
  ConfigService configService = Get.find();
  AppController appController = Get.find();

  RxString userName = ''.obs;
  RxString userEmail = ''.obs;
  RxString userPhoneNum = ''.obs;
  RxString userAvatar = ''.obs;
  RxBool isAvatar = false.obs;
  RxBool isEmailVarify = false.obs;

  @override
  void onInit() async {
    this.getUserProfile();
    super.onInit();
  }

  Future getUserProfile() async {
    var result = await apiService.getUserInfo();
    UserProfileModel userProfileModel = UserProfileModel.fromJson(result);
    if (userProfileModel.statusCode == 200 && userProfileModel.data != null) {
      this.userEmail.value = userProfileModel.data!.email.toString();
      this.userName.value = userProfileModel.data!.firstName.toString();

      if (userProfileModel.data!.phoneNum != null) {
        this.userPhoneNum.value = userProfileModel.data!.phoneNum.toString();
      } else {
        this.userPhoneNum.value = '+63 ';
      }

      if (userProfileModel.data!.avatar != null) {
        this.isAvatar.value = true;
        this.userAvatar.value = userProfileModel.data!.avatar.toString();
      }

      if (userProfileModel.data!.isEmailVerify == true) {
        this.isEmailVarify.value = true;
      } else {
        this.isEmailVarify.value = false;
      }
    }
  }
}
