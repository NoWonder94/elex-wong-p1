import 'package:bossjobapp/Models/ConfigData.dart';
import 'package:bossjobapp/Models/LocationModel.dart';
import 'package:get/get.dart';

import 'ApiService.dart';

class ConfigService extends GetxService {
  ApiService apiService = Get.find();
  Rx<ConfigData> _configData = new ConfigData().obs;
  Rx<LocationModel> _locationData = new LocationModel().obs;

  @override
  void onInit() {
    getConfigData();
    getLocationData();
    super.onInit();
  }

  Future getConfigData() async {
    var json = await apiService.getConfig();
    _configData.value = ConfigData.fromJson(json);
  }

  Future getLocationData() async {
    var json = await apiService.getLocationList();
    _locationData.value = LocationModel.fromJson(json);
  }

  LocationModel get getLocation => _locationData.value;

  ConfigData get getConfig => _configData.value;

  List<String> getExperienceList() {
    List<String>? list = [];

    _configData.value.data!.inputs!.xpLvls!.forEach((element) {
      list.add(element!.value.toString());
    });

    return list;
  }

  String getExperienceKeyByValue(expValue) {
    String key = '';
    _configData.value.data!.inputs!.xpLvls!.forEach((element) {
      if (element!.value == expValue) {
        key = element.key.toString();
      }
    });

    return key.replaceAll('(', '').replaceAll(')', '');
  }

  List<String> getLocationList() {
    List<String>? list = [];

    _locationData.value.data!.locations!.forEach((element) {
      list.add(element!.value.toString());
    });

    return list;
  }

  String getLocationKeyByValue(locationValue) {
    String key = '';
    _locationData.value.data!.locations!.forEach((element) {
      if (element!.value == locationValue) {
        key = element.key.toString();
      }
    });
    return key;
  }

  List<String> getSpecializationList() {
    List<String>? list = [];

    _configData.value.data!.inputs!.jobCategoryLists!.forEach((element) {
      list.add(element!.value.toString());
    });
    return list;
  }

  List<String> getSpecializationListKeyByValue(specializationValue) {
    List<String>? list = [];
    specializationValue
        .map((value) => _configData.value.data!.inputs!.jobCategoryLists!
                .forEach((element) {
              if (element!.value == value) {
                list.add(element.id.toString());
              }
            }))
        .toList();

    return list;
  }

  List<String> getIndustryList() {
    List<String>? list = [];

    _configData.value.data!.inputs!.industryLists!.forEach((element) {
      list.add(element!.value.toString());
    });

    return list;
  }

  String getIndustryKeyByValue(indValue) {
    String key = '';
    _configData.value.data!.inputs!.industryLists!.forEach((element) {
      if (element!.value == indValue) {
        key = element.key.toString();
      }
    });

    return key.replaceAll('(', '').replaceAll(')', '');
  }
}
