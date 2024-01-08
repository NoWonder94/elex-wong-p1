import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:get/get.dart';

class EducationExperienceController extends BaseController {
  AppController appController = Get.find();
  RxBool deleteLoading = false.obs;

  /* delete */
  Future submitDeleteEducation(eduId) async {
    this.deleteLoading.value = true;
    // print(eduId);
    var results = await apiService.deleteEducationExp(eduId);

    if (results['status_code'] == 200 && results['message'] == 'OK') {
      appController.getUserProfile();
      showSuccess('success'.tr, results['data']['message']);
    }
    this.deleteLoading.value = false;
  }
}
