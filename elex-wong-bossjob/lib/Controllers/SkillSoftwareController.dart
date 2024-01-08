import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Models/SkillFilterModel.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:easy_debounce/easy_debounce.dart';
import 'package:get/get.dart';

class SkillSoftwareController extends BaseController {
  AppController appController = Get.find();
  RxString inputSkill = ''.obs;
  RxBool skillFilterLoading = false.obs;
  Rx<SkillFilterModel> skillFilterModel = new SkillFilterModel().obs;
  RxList userJobSkillList = new List.empty().obs;
  RxList filterJobSkillList = new List.empty().obs;
  RxBool isSubmitLoading = false.obs;

  @override
  void onInit() async {
    this.getUserSkillList();
    super.onInit();
  }

  getUserSkillList() {
    if (appController.userInfo.value.data!.skills!.jobSkills != "") {
      var splitValue =
          appController.userInfo.value.data!.skills!.jobSkills!.split(',');

      splitValue.forEach((element) {
        this.userJobSkillList.add(element);
      });
    }
  }

  setInputSkill(val) {
    filterJobSkillList.clear();
    this.inputSkill.value = val;
  }

  addSeletedSkill(val) {
    userJobSkillList.add(val);
    filterJobSkillList.clear();
    skillFilterModel.value = new SkillFilterModel();
  }

  removeSelectedSkill(val) {
    userJobSkillList.remove(val);
  }

  Future getInputSkillSuggest(val) async {
    if (val == '') {
      return;
    }

    EasyDebounce.debounce(
      'skills-debouce',
      Duration(milliseconds: 1000),
      () async {
        var query = {
          'query': val,
          'size': 5,
        };

        skillFilterLoading.value = true;
        filterJobSkillList.clear();
        /* get filter result */
        var filterResults = await apiService.getSkillFilter(query);
        skillFilterModel.value = SkillFilterModel.fromJson(filterResults);

        /* 
          add filter results and input results into a new list
          user can select filter results, and self input results
        */
        var skillFilterList = skillFilterModel.value.data!.schools;
        skillFilterList!.forEach((element) {
          filterJobSkillList.add(element!.value.toString());
        });
        filterJobSkillList.add(inputSkill.value);
        // print(filterJobSkillList);

        skillFilterLoading.value = false;
      },
    );
  }

  Future submitSkills() async {
    if (userJobSkillList == []) {
      return;
    }

    this.isSubmitLoading.value = true;

    var joinArrayList = userJobSkillList.join(',');
    var data = {
      'job_skills': joinArrayList,
    };

    var json = await apiService.submitSkill(data);
    if (json['message'] == "OK" && json['status_code'] == 200) {
      AnalyticsService().updateResume("skills");
      showSuccess('success'.tr, 'updateSuccess'.tr);

      AppController appController = Get.find();
      appController.getUserProfile();

      Future.delayed(
        Duration(
          milliseconds: 3000,
        ),
        () {
          Get.back();
        },
      );
    }
    this.isSubmitLoading.value = false;
  }

  @override
  void dispose() {
    EasyDebounce.cancel('skills-debouce');
    super.dispose();
  }
}
