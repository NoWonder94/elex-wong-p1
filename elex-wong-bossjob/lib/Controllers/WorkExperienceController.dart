import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:get/get.dart';

class WorkExperienceController extends BaseController {
  AppController appController = Get.find();
  RxBool deleteLoading = false.obs;

  /* delete */
  Future submitDeleteWork(workId) async {
    this.deleteLoading.value = true;
    // print(workId);
    var results = await apiService.deleteWorkingExp(workId);

    if (results['status_code'] == 200 && results['message'] == 'OK') {
      appController.getUserProfile();
      showSuccess('success'.tr, results['data']['message']);
    }
    this.deleteLoading.value = false;
  }
}
