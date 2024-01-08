import 'package:bossjobapp/Constants/common.dart';
import 'package:bossjobapp/Constants/constant.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SearchJobController extends BaseController {
  RxString searchQuery = ''.obs;
  RxList<String> selectedIndustry = new List<String>.empty().obs;
  RxList<String> selectedLocation = new List<String>.empty().obs;
  RxList<String> selectedRegion = new List<String>.empty().obs;
  Rx<RangeValues> salaryRange = new RangeValues(rangebarMin, rangebarMax).obs;
  RxList<String> selectedType = new List<String>.empty().obs;
  RxList<String> selectedSpecialization = new List<String>.empty().obs;
  RxList<String> selectedExperience = new List<String>.empty().obs;
  RxList<String> selectedDegree = new List<String>.empty().obs;
  RxList searchJobList = [].obs;
  RxList suggestionList = [].obs;
  RxInt totalPages = 0.obs;
  RxBool isLoading = false.obs;

  @override
  void onInit() async {
    super.onInit();
    clearInput();
  }

  clearInput() {
    searchQuery.value = '';
    selectedIndustry.clear();
    selectedLocation.clear();
    selectedRegion.clear();
    selectedType.clear();
    selectedSpecialization.clear();
    selectedExperience.clear();
    selectedDegree.clear();
    searchJobList.clear();
    totalPages.value = 0;
    salaryRange.value = RangeValues(rangebarMin, rangebarMax);
  }

  setSelectedKey(key, setKey) {
    if (setKey.contains(key)) {
      setKey.remove(key);
    } else {
      setKey.add(key);
    }
  }

  setLocationKey(key, setKey, region) {
    if (key.contains(',')) {
      var arr = key.split(', ');
      if (selectedRegion.contains(region)) {
        selectedRegion.remove(region);
        for (var i in arr) {
          if (setKey.contains(i)) {
            setKey.remove(i);
          }
        }
      } else {
        selectedRegion.add(region);
        for (var i in arr) {
          if (!setKey.contains(i)) {
            setKey.add(i);
          }
        }
      }
    } else if (region == 'Overseas' || region == 'Homebased') {
      if (selectedRegion.contains(region)) {
        selectedRegion.remove(region);
        if (setKey.contains(key)) {
          setKey.remove(key);
        }
      } else {
        selectedRegion.add(region);
        if (!setKey.contains(key)) {
          setKey.add(key);
        }
      }
    } else {
      setSelectedKey(key, setKey);
    }
  }

  updateSearchQuery(value) {
    searchQuery.value = value;
  }

  updateSalaryRange(value) {
    salaryRange.value = value;
  }

  Future searchJob({int page = 1}) async {
    isLoading.value = true;
    if (page == 1) {
      searchJobList.clear();
      totalPages.value = 0;
    }
    var map = {
      'company_industries': selectedIndustry.join(','),
      'degrees': selectedDegree.join(','),
      'job_categories': selectedSpecialization.join(','),
      'job_locations': selectedLocation.join(','),
      'job_types': selectedType.join(','),
      'salary_from': salaryRange.value.start.toInt(),
      'salary_to': salaryRange.value.end.toInt(),
      'xp_lvls': selectedExperience.join(','),
      'query': searchQuery.value,
      'size': 18,
      'sort': 1,
      'page': page,
      'is_company_verified': 0,
      'source': 'app',
    };

    var data = await apiService.getJobList(map);
    if (data['status_code'] == 200) {
      AnalyticsService().search(map);
      if (data['data']['total_num'] > 0) {
        searchJobList.addAll(data['data']['jobs']);
        totalPages.value = data['data']['total_pages'];
      }
    }
    isLoading.value = false;
  }

  Future getSuggestion(text) async {
    suggestionList.clear();
    var map = {
      'query': text,
      'size': 5,
    };
    var data = await apiService.getSuggestion(map);
    if (data['status_code'] == 200) {
      if (data['data']['list'].length > 0) {
        data['data']['list'].forEach((element) {
          suggestionList.add(element['value']);
        });
      }
    }
  }
}
