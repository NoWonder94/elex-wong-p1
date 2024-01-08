import 'package:flutter/foundation.dart';
import 'package:get/get.dart';

class LogModel {
  final String type;
  final dynamic response;

  LogModel(this.type, this.response);
}

class LogService extends GetxService {
  RxBool logEnable = false.obs;
  RxList<LogModel> logs2 = new List<LogModel>.empty().obs;
  RxList<String> printLog = new List<String>.empty().obs;

  void logResponse(LogModel log) {
    logs2.add(log);
  }

  void logPrint(String log, {p = kDebugMode}) {
    printLog.add(log);
    if (p) {
      print(log);
    }
  }

  void clearLog() {
    logs2.clear();
    printLog.clear();
  }

  void toggle() {
    logEnable.value = !logEnable.value;
  }
}
