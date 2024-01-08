import 'package:bossjobapp/Models/JobInfoModel.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:get/get.dart';

import '../BaseController.dart';

class JobInfomationController extends BaseController {
  Rx<JobInfoModel> jobInfoModel = new JobInfoModel().obs;
  RxBool isJobInfoLoading = false.obs;
  @override
  void onInit() {
    if (Get.arguments != null) {
      if (Get.arguments['id'] != null) {
        getJobDetailsData(Get.arguments['id']);
      }
    }

    super.onInit();
  }

  void getJobDetailsData(id) async {
    this.isJobInfoLoading.value = true;
    var json = await apiService.getJobInfo(id);
    if (json['success'] == false) {
      showError('error'.tr, json['errors'].toString());
      this.isJobInfoLoading.value = false;
      return;
    }
    jobInfoModel.value = JobInfoModel.fromJson(json);
    this.isJobInfoLoading.value = false;
  }
}
