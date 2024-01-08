import 'package:bossjobapp/Services/ApiService.dart';
import 'package:bossjobapp/Services/LogService.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BaseController extends GetxController {
  ApiService apiService = Get.find();
  SharedPreferences prefs = Get.find();
  GetStorage box = Get.find();
  LogService logService = Get.find();
}
