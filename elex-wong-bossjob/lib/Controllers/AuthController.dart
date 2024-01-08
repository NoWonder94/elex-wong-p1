import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:get/get.dart';

class AuthController extends BaseController {
  RxString baseToken = ''.obs;
  RxString token = ''.obs;
  RxString fcmToken = ''.obs;

  Future init(fcmToken) async {
    updateFCMToken(fcmToken);
    var data = prefs.getString('token');
    if (data != null) {
      await updateAuthToken(data);
    }
  }

  Future updateFCMToken(t) async {
    fcmToken.value = t;
    await prefs.setString('fcmToken', t);
  }

  Future updateAuthToken(t) async {
    token.value = t;
    box.write('token', t);
    await prefs.setString('token', t);
    updateToken(t);
  }

  Future updateToken(data) async {
    apiService.dio.options.headers.addIf(
        !apiService.dio.options.headers.containsKey('Authorization'),
        'Authorization',
        'Bearer $data');
  }

  String? getToken() {
    return prefs.getString('token');
  }

  void deleteToken() async {
    token.value = '';
    box.remove('token');
    apiService.dio.options.headers.remove('Authorization');
    await prefs.remove('token');
  }

  void logout() async {
    var json = await apiService.logout();
    if (json['success']) {
      logoutSuccess();
    } else {
      showError('Logout Failed', 'Please try again');
    }
  }

  void forceLogout() {
    deleteToken();
    Get.until((route) => Get.currentRoute == '/auth');
    Get.toNamed('/auth');
  }

  void logoutSuccess() {
    deleteToken();
    showSuccess('Log Out', 'Log Out Success');
    Get.until((route) => Get.currentRoute == '/auth');
    Get.toNamed('/auth');
  }

  bool isLogin() {
    return token.value.isNotEmpty ? true : false;
  }
}
