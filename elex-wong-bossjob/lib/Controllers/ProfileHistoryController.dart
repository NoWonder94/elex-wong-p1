import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Models/AppliedJobModel.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:get/get.dart';

class ProfileHistoryController extends BaseController {
  Rx<AppliedJobModel> appliedJobs = new AppliedJobModel().obs;
  RxBool isAppliedListLoading = false.obs;
  RxList appliedJobsList = [].obs;
  int totalPages = 0;

  @override
  void onInit() async {
    this.getAppliedJobs(1);
    super.onInit();
  }

  // Future getAppliedJobs({int page = 1}) async {
  //   this.isAppliedListLoading.value = true;

  //   var params = {
  //     'page': page,
  //     'size': 18,
  //   };

  //   var results = await apiService.getAppliedJobLists(params);
  //   if (results['status_code'] == 200 && results['message'] == 'OK') {
  //     if (page != 1) {
  //       AppliedJobModel newPageData = AppliedJobModel.fromJson(results);
  //       if (newPageData.data!.jobApplications!.length > 0) {
  //         appliedJobs.value.data!.jobApplications!
  //             .addAll(newPageData.data!.jobApplications!);
  //       }
  //     } else {
  //       appliedJobs.value = AppliedJobModel.fromJson(results);
  //     }
  //   }
  //   this.isAppliedListLoading.value = false;
  // }

  Future getAppliedJobs(page) async {
    if (page == 1) {
      this.isAppliedListLoading.value = true;

      if (this.appliedJobsList.length > 1) this.appliedJobsList.clear();
    }

    if (totalPages == 0 || page <= totalPages) {
      var params = {
        'page': page,
        'size': 18,
      };

      var json = await apiService.getAppliedJobLists(params);

      if (json['success'] == false) {
        if (page == 1) {
          this.isAppliedListLoading.value = false;
        }
        return;
      }

      appliedJobs.value = AppliedJobModel.fromJson(json);
      if (page == 1) {
        this.isAppliedListLoading.value = false;
        AnalyticsService().clickAppsHistory(json['data']['total_pages']);
      }
      if (json['data']['job_applications'] != null &&
          json['data']['job_applications'].length > 0) {
        totalPages = json['data']['total_pages'];

        this.appliedJobsList.addAll(json['data']['job_applications']);
      }
    }
  }
}
