import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Services/UploadService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:get/state_manager.dart';
import 'package:get/get.dart';

class ManageResumeController extends BaseController {
  RxString filename = ''.obs;
  RxBool loading = false.obs;
  UploadService uploadService = Get.put(UploadService());
  AppController appController = Get.put(AppController());

  updateResume() async {
    uploadService.upload(
      type: UploadType.RESUME,
      onLoading: () {
        loading.value = true;
      },
      onSuccess: (fileName) {
        filename.value = fileName;
        loading.value = false;
        AnalyticsService().updateResume("upload-resume");
        showSuccess('success'.tr, 'resumeUpdated'.tr);
        appController.getUserProfile();
      },
      onFailed: (error) {
        loading.value = false;
        showError('Failed', error);
      },
    );
  }
}
