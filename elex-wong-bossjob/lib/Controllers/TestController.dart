import 'package:get/get.dart';

class TestController extends GetxController {
  RxString country = ''.obs;
  RxString availabilty = ''.obs;

  void setCountry(val) {
    this.country.value = val;
    // print(this.country.value);
  }

  void setAvailabilty(val) {
    this.availabilty.value = val;
    // print(this.availabilty.value);
  }
}
