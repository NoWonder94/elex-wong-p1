import 'dart:convert';

import 'package:bossjobapp/Controllers/AuthController.dart';
import 'package:bossjobapp/Services/LogService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:bossjobapp/Utils/pretty_logger.dart';
import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:get/get.dart';

class ApiService extends GetxService {
  static const String apiEndpoint = 'https://api.bossjob.com/data';
  static const String authEndpoint =
      'https://authentication.bossjob.com/api/v1';
  static const String searchEndpoint = 'https://search.bossjob.com/api/v1';
  static const String chatEndpoint = 'https://api.bossjob.com/chat/api/v3';
  static const bool debug = kDebugMode;
  final LogService logService = Get.find();

  Dio dio = new Dio(new BaseOptions(
    baseUrl: apiEndpoint,
    connectTimeout: 60000,
    headers: {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
      "content-type": "application/json;charset=UTF-8",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site"
    },
    validateStatus: (status) {
      return status! < 500;
    },
  ));

  void init() {
    PrettyDioLogger logger = PrettyDioLogger();
    logger.responseAddOn = (response) async {
      try {
        if (response.statusCode! == 401) {
          if (response.data['message'] != null) {
            showError('error'.tr, response.data['message']);
            AuthController authController = Get.find();
            authController.forceLogout();
          }
        }
      } catch (e) {
        return response;
      }
    };
    // dio.interceptors.add(logger);
  }

  Future apiRequest(
      String path, String type, dynamic data, String? baseUrl) async {
    var response;
    if (baseUrl != null) {
      dio.options.baseUrl = baseUrl;
    } else {
      dio.options.baseUrl = apiEndpoint;
    }

    /*
    if (baseUrl == 'https://dev.api.bossjob.com/chat/api/v3') {
        var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjdlMmEzMzYwZTgzYWYzMjEzNjE3ZjZmNDliMmRmODczZDk1NjJhOTVjMzQ3MGMxODliOTQzY2Q5MTBmZWJhYzhmOWJiYjliYTgxYTBjYTQiLCJpYXQiOjE2MzI3MjcxODUsIm5iZiI6MTYzMjcyNzE4NSwiZXhwIjoxNjMzMzMxOTg1LCJzdWIiOiIxNDg3Iiwic2NvcGVzIjpbXX0.RlQoivXMhO2WihuNX5Lmon4ZbfE-8PMmsx1C3g5jQXBxspnfU2a-oVkDoeqOB7jNubcYg2iEftDND0BhLrQvoy4zUxAqK3KGnpna-T67Z1E1GwmPBti8K8nkWVpO61g_UCXiycXIxxbkbImI7gbdZa_E3g9-cBiUfo_rck0fZCBgb_8dunF6Va7lJyc-14JyFl9ySzzdcdonaV_fbM5q4SgJaRiqGeMN11vU0UrK1dAOlkF6hW1SbgHzbO1PxmRWIoK-YjN_d8gC5SkMW6dFOZHKLLwDxU5Fr9TUW_ple-g-2fhONKchxJ5OKSgjsGr4if4Xj2d1g3Jshth7RqxLamF39sMv1POrtNhNn9sFbamPFJoD8ETDr48VqAZWHajbFN_LTI2HdWeiouQ2JzIuVh4HdG5CkjUpInXlskI0UzRZVhko6n10SpQ6TYA6nK-CLMMSnoxdyn3jgnblK0xjjfdK8XNyz9MmPxik8ljmsdDMM6Rm25gnKnYFBqjz28UfxZEmstguvWTjaQc1HNpuXZ8zlruIWETu6W7GlK8MnIQ3mIdQqVgkhHisrdQ6SfXjdLfkXVaZNG0x6SAgk5ZB98uyIwTpTTJOCbqJFQaMx1qEB-brp_Z9y082RygGho51CymvFzIFxgpJusdzj1mCAQ6XnTY-63q7hJkem3xcr5M';
        dio.options.headers.addIf(true, "Authorization", "Bearer $token");
    } else {
        var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWVlZjE1MjYwYjUwZDE4ZjNjMDdkYWZmYzhkY2I1MDZmN2M3NGJjNjA5ZTIzOGE2NmM5ZjNiM2I2NmU0ODcxNGUzNTZkNjA5NDdkZDZiMGEiLCJpYXQiOjE2MzIzODI5NjYsIm5iZiI6MTYzMjM4Mjk2NiwiZXhwIjoxNjMyNDY5MzY2LCJzdWIiOiIyMjcxNzcwIiwic2NvcGVzIjpbXX0.GtTUJFPOxSv78IiQPJgaCsjL_qNQQ48J0GO7T2Eua5-oOuOUgCYtmUvK_i_9fFuTTKmiy7R8Fr7Nm1ZgAJojBqEygPcAlthfewePZvxP0XFUHcmpOVAZ-x6atF2KzIimXp9N8WU52evt5AwiP0nXQPJNjeGBexRaWmY0igzd5F1btOi8X7-ViCsAxY5eUNM8aPR-mRI_L9esMkmvJOIOWyFIbebhFxTiTkYrFI_ryanuB7DWEysmpvI_okTdcIyhoS-RhnA1CXFeJtyF8NjiRG9uMiXSTeB3GnlgDeEH5EZLfOsKlHOayuHMaUFDhforFfcXlXzseXCxN_5e7kBPkLX5078cB4CuXxrWMMhPJskP4WOKPacc68ikpu7Fp9a-NNbDO8p0hB9LNKrAYjKKAz4xWMSHk4CPMbLrNprj1pi32k73Ysg5nklIAFueQvFOpQJY8genQtW0tIbjhVZVhGOMC4JSfNplJho5KilrowSlTrtP2klqR8_VBDQQ2B2ej2dipTOx6yUsv5HT6CBDVhSQ5gtfoFz0dpWvHX0kwEuj2tX0m4A4rzwWr-_EUS6C1d3jwvfNkOVzAVYQ6DbYpx0vvKAr9ugaxt9ut_a6UVZnWHuNr4e4TUs4IrNQ0RrAvo_1vw85MgvaDOeBjXSnNXjclDl2bJz48wgfk0z2th4';
        dio.options.headers.addIf(true, "Authorization", "Bearer $token");
    }
    */

    if (type == 'get') {
      response = await dio.get(path, queryParameters: data);
    } else if (type == 'post') {
      response = await dio.post(path, data: data);
    } else if (type == 'put') {
      response = await dio.put(path, data: data);
    } else if (type == 'delete') {
      response = await dio.delete(path, data: data);
    } else if (type == 'patch') {
      response = await dio.patch(path, queryParameters: data);
    } else {
      response = await dio.get(path);
    }
    var json = jsonDecode(response.toString());
    return json;
  }

  Future getConfig() async {
    return await apiRequest('/config', 'get', null, null);
  }

  Future getLocationList() async {
    return await apiRequest(
        '/search/location_lists?size=999', 'get', null, searchEndpoint);
  }

  Future register(data) async {
    return await apiRequest('/users/register', 'post', data, null);
  }

  Future login(data) async {
    return await apiRequest('/login', 'post', data, authEndpoint);
  }

  Future socialLogin(data) async {
    return await apiRequest('/social_login', 'post', data, authEndpoint);
  }

  Future hasSocialLogin(data) async {
    return await apiRequest('/has_social_login', 'post', data, authEndpoint);
  }

  Future logout() async {
    return await apiRequest('/logout', 'post', null, authEndpoint);
  }

  Future getJobList(data) async {
    return await apiRequest('/search/job_filter', 'get', data, searchEndpoint);
  }

  Future getTopCompanyList() async {
    return await apiRequest('/companies/features', 'get', null, null);
  }

  Future sendVerifyCode() async {
    return await apiRequest('/email/generate-otp', 'post', null, null);
  }

  Future verifyEmail(data) async {
    return await apiRequest('/email/verify', 'get', data, null);
  }

  Future jobFilter(query) async {
    return await apiRequest('/search/job_filter?query=$query&size=6&source=app',
        'get', null, searchEndpoint);
  }

  Future industryFilter(query) async {
    return await apiRequest(
        '/search/industry_lists?query=$query', 'get', null, searchEndpoint);
  }

  Future companyFilter(query) async {
    return await apiRequest(
        '/search/company_lists?query=$query', 'get', null, searchEndpoint);
  }

  Future jobTitleFilter(query) async {
    return await apiRequest(
        '/search/job_lists?query=$query', 'get', null, searchEndpoint);
  }

  Future schoolFilter(query) async {
    return await apiRequest(
        '/search/school_lists?query=$query', 'get', null, searchEndpoint);
  }

  Future submitPreference(data) async {
    return await apiRequest('/users/preferences', 'post', data, null);
  }

  Future getJobDetail(data) async {
    return await apiRequest('/jobs/description/template', 'get', data, null);
  }

  Future getJobCompany(id) async {
    return await apiRequest('/companies/$id', 'get', null, null);
  }

  Future getJobCompanyOtherJobs(id, params) async {
    return await apiRequest('/companies/$id/jobs', 'get', params, null);
  }

  Future getJobInfo(id) async {
    return await apiRequest('/jobs/$id', 'get', null, null);
  }

  Future getUserInfo() async {
    return await apiRequest('/users/me', 'get', null, null);
  }

  Future getEditVerificationCode(data) async {
    return await apiRequest('/otps/registration', 'post', data, null);
  }

  Future submitChangeEmailRequest(data) async {
    return await apiRequest('/users/change_email', 'patch', data, null);
  }

  Future submitChangePhoneRequest(data) async {
    return await apiRequest('/users/change_phone_num', 'patch', data, null);
  }

  Future submitChangePasswordRequest(data) async {
    return await apiRequest('/users/change_password', 'patch', data, null);
  }

  Future uploadResume(data) async {
    return await apiRequest('/users/resumes', 'post', data, null);
  }

  Future uploadAvatar(data) async {
    return await apiRequest('/users/avatars', 'post', data, null);
  }

  Future uploadMe(data) async {
    return await apiRequest('/users/me', 'put', data, null);
  }

  Future submitWorkingExp(data) async {
    return await apiRequest('/users/work_xps', 'post', data, null);
  }

  Future getWorkExp(workId) async {
    return await apiRequest('/users/work_xps/$workId', 'get', null, null);
  }

  Future updateWorkExp(workId, data) async {
    return await apiRequest('/users/work_xps/$workId', 'put', data, null);
  }

  Future submitEducationExp(data) async {
    return await apiRequest('/users/edu_xps', 'post', data, null);
  }

  Future getEducationExp(eduId) async {
    return await apiRequest('/users/edu_xps/$eduId', 'get', null, null);
  }

  Future updateEducationExp(eduId, data) async {
    return await apiRequest('/users/edu_xps/$eduId', 'put', data, null);
  }

  Future deleteEducationExp(eduId) async {
    return await apiRequest('/users/edu_xps/$eduId', 'delete', null, null);
  }

  Future deleteWorkingExp(workId) async {
    return await apiRequest('/users/work_xps/$workId', 'delete', null, null);
  }

  Future getChatList(userId, data) async {
    return await apiRequest(
        '/users/$userId/dialogues', 'get', data, chatEndpoint);
  }

  Future getChatDetail(userId, dialogueId, data) async {
    return await apiRequest(
        '/users/$userId/dialogues/$dialogueId', 'get', data, chatEndpoint);
  }

  Future getSuggestion(data) async {
    return await apiRequest(
        '/search/auto_suggestion_lists', 'get', data, searchEndpoint);
  }

  Future getAppliedJobLists(params) async {
    return await apiRequest('/users/applied_jobs', 'get', params, null);
  }

  Future submitJobApplication(id, params) async {
    return await apiRequest('/jobs/$id/applications', 'post', params, null);
  }

  Future getSkillFilter(params) async {
    return await apiRequest(
        '/search/skill_lists', 'get', params, searchEndpoint);
  }

  Future submitSkill(data) async {
    return await apiRequest('/users/skills', 'put', data, null);
  }

  Future completeProfile(data) async {
    return await apiRequest('/users/complete_profile', 'post', data, null);
  }

  Future deactivateAccount() async {
    return await apiRequest(
        '/jobseekers/deactivate', 'delete', null, 'https://api.bossjob.com');
  }
}
