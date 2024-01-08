import 'dart:convert';

import 'package:bossjobapp/Models/ValidatorMessageModel.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:bossjobapp/Widgets/VerifyEmail.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Utils/Common.dart';

String formatJobPrice(priceFrom, priceTo) {
  if (!isNumeric(priceFrom.toString()) || !isNumeric(priceTo.toString())) {
    return "";
  }
  priceFrom = '₱' + (priceFrom / 1000).round().toString() + 'K';
  priceTo = '₱' + (priceTo / 1000).round().toString() + 'K';

  return priceFrom + '-' + priceTo;
}

List formatJobSkills(jobSkills) {
  if (jobSkills == null || jobSkills == "") {
    return [];
  }
  return jobSkills.split(",");
}

Future<String> loadJsonFile(name) async {
  return await rootBundle.loadString('lib/Assets/Json/$name.json');
}

void showVerifyEmail({callback}) {
  Get.dialog(Scaffold(
    backgroundColor: Colors.transparent,
    body: VerifyEmail(
      callback: callback,
    ),
    resizeToAvoidBottomInset: false,
  ));
}

String formatChatDate(date) {
  /*
  var formatter = new DateFormat('dd/MM/yyyy');
  
  return formatter.format(date);
  */

  return date.substring(0, 10);
}

Color getStatusContainerColor(statusid) {
  switch (statusid) {
    case 1:
      return Color.fromARGB(255, 85, 162, 36);
    case 4:
      return Color.fromARGB(255, 255, 255, 255);
    default:
      return Color.fromARGB(255, 82, 141, 255);
  }
}

Color getStatusFontColor(statusid) {
  switch (statusid) {
    case 4:
      return Color.fromARGB(255, 226, 226, 226);
    default:
      return Color.fromARGB(255, 255, 255, 255);
  }
}

Image getBenefitImage(id) {
  switch (id) {
    case 1:
      return Image.asset(equityIncentive);
    case 3:
      return Image.asset(commission);
    case 4:
      return Image.asset(performanceBonus);
    case 5:
      return Image.asset(telecommunicationAllowance);
    case 6:
      return Image.asset(mealAllowance);
    case 7:
      return Image.asset(transportAllowance);
    case 9:
      return Image.asset(otherAllowances);
    default:
      return Image.asset(otherAllowances);
  }
}

String getUnixTime() {
  return DateTime.now().millisecondsSinceEpoch.toString();
}

String formatTime(datetime) {
  return DateFormat.Hm().format(DateTime.parse(datetime));
}

String formatDate(datetime) {
  return DateFormat.yMMMd().format(DateTime.parse(datetime));
}

/// JSON Response美化 使用方法
/// ResponseBeautify.prettyPrintJson(json);

class ResponseBeautify {
  static JsonEncoder encoder = JsonEncoder.withIndent(' ');

  static void prettyPrintJson(input) {
    var prettyString = encoder.convert(input);
    prettyString.split('\n').forEach((element) => print(element));
  }
}

/// 获取对应的Validation Error

String getErrorMessage(ValidatorMessageModel validatorMessage, key) {
  var error = validatorMessage.data!.where((element) => element!.field == key);
  if (error.first != null) {
    return error.first!.message![0]!;
  }

  return '';
}

Map<String, dynamic>? parseJwt(String token) {
  // validate token
  if (token == null) return null;
  final List<String> parts = token.split('.');
  if (parts.length != 3) {
    return null;
  }
  // retrieve token payload
  final String payload = parts[1];
  final String normalized = base64Url.normalize(payload);
  final String resp = utf8.decode(base64Url.decode(normalized));
  // convert to Map
  final payloadMap = json.decode(resp);
  if (payloadMap is! Map<String, dynamic>) {
    return null;
  }
  return payloadMap;
}

String getQueryString(Map params,
    {String prefix: '&', bool inRecursion: false}) {
  String query = '';

  params.forEach((key, value) {
    if (inRecursion) {
      key = '[$key]';
    }

    if (value is String || value is int || value is double || value is bool) {
      query += '$prefix$key=$value';
    } else if (value is List || value is Map) {
      if (value is List) value = value.asMap();
      value.forEach((k, v) {
        query +=
            getQueryString({k: v}, prefix: '$prefix$key', inRecursion: true);
      });
    }
  });

  return query;
}

String filterHtml(String s) {
  s = s.replaceAll("<p><br></p>", "");
  return s;
}
