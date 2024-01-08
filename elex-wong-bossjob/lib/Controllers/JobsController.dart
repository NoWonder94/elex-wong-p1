import 'package:get/get.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';

class JobsController extends BaseController {
  RxList topCompanyList = [].obs;
  RxList jobList = [].obs;
  RxBool isTopCompanyListLoading = false.obs;
  RxBool isJobListLoading = false.obs;
  RxList jobDetail = [].obs;

  @override
  void onInit() async {
    super.onInit();
    this.getTopCompanyList();
  }

  Future getTopCompanyList() async {
    this.isTopCompanyListLoading.value = true;
    var result = await apiService.getTopCompanyList();
    if (result['message'] == 'OK' && result['data'] != null) {
      if (result['data'].length > 0) {
        this.topCompanyList.value = result['data'];
      }
    }
    this.isTopCompanyListLoading.value = false;
  }

  Future getJobList({int page = 1}) async {
    this.isJobListLoading.value = true;
    var params = {
      'is_company_verified': 0,
      'page': page,
      'size': 18,
      'sort': 1,
      'source': 'app',
    };
    var result = await apiService.getJobList(params);
    if (result['message'] == 'OK' && result['data'] != null) {
      if (result['data']['jobs'] != null && result['data']['jobs'].length > 0) {
        this.jobList.addAll(result['data']['jobs']);
      }
    }
    this.isJobListLoading.value = false;
  }

  Future getJobDetail() async {
    this.isJobListLoading.value = true;
    var params = {
      'title':
          'Voice Support | BPO Experience Required | 30,000* Joining Bonus (EL 971)'
    };
    var result = await apiService.getJobDetail(params);

    if (result['message'] == 'OK' && result['data'] != null) {
      if (result['data']['jobs'] != null && result['data']['jobs'].length > 0) {
        this.jobDetail.addAll(result['data']['jobs']);
      }
    }
    this.isJobListLoading.value = false;
  }
}
