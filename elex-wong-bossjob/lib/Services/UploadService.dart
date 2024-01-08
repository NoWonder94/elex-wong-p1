import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:get/get.dart';
import 'ApiService.dart';
import 'package:dio/dio.dart' as dio;

enum UploadType {
  RESUME,
  AVATAR,
}

class UploadService extends GetxService {
  var apiService = Get.put(ApiService());

  Future upload(
      {required UploadType type,
      required onLoading,
      required onSuccess,
      required onFailed}) async {
    var result;
    if (type == UploadType.RESUME) {
      result = await FilePicker.platform.pickFiles(type: FileType.any);
    } else if (type == UploadType.AVATAR) {
      result = await FilePicker.platform.pickFiles(type: FileType.image);
    }
    if (result != null) {
      if (result.files.single.name.isEmpty) {
        onFailed('Invalid File Name');
      }
      String filename = result.files.single.name;
      File file = File(result.files.single.path!);

      onLoading();
      var response;
      if (type == UploadType.RESUME) {
        dio.FormData formData = dio.FormData.fromMap({
          "filename": filename,
          "resume": await dio.MultipartFile.fromFile(
            file.path,
            filename: filename,
          ),
        });
        response = await apiService.uploadResume(formData);
      } else if (type == UploadType.AVATAR) {
        dio.FormData formData = dio.FormData.fromMap({
          "filename": filename,
          "avatar": await dio.MultipartFile.fromFile(
            file.path,
            filename: filename,
          ),
        });
        response = await apiService.uploadAvatar(formData);
      } else {
        onFailed('Invalid Type');
        return;
      }
      if (response['status_code'] == 200 || response['status_code'] == 201) {
        if (result.files.single.name.isNotEmpty) {
          if (onSuccess != null) {
            onSuccess(result.files.single.name);
          }
        }
      } else {
        onFailed(response);
      }
    } else {
      // onFailed('User Close File Picker');
    }
  }
}
