import 'dart:math';

import 'package:bossjobapp/Constants/color.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:fluttertoast/fluttertoast.dart';

double h(context, percentage) {
  return MediaQuery.of(context).size.height * percentage;
}

double w(context, percentage) {
  return MediaQuery.of(context).size.width * percentage;
}

int random(min, max) {
  var rn = new Random();
  return min + rn.nextInt(max - min);
}

void showSuccess(title, desc) {
  Get.snackbar(
    title,
    desc,
    backgroundColor: primaryColor,
    colorText: Colors.white,
  );
}

void showError(title, desc) {
  Get.snackbar(
    title,
    desc,
    backgroundColor: error,
    colorText: Colors.white,
  );
}

void showToast(
    {text = '', gravity = ToastGravity.CENTER, length = Toast.LENGTH_SHORT}) {
  Fluttertoast.showToast(
      msg: text ?? '-',
      toastLength: length,
      gravity: gravity,
      timeInSecForIosWeb: 1,
      backgroundColor: Colors.red,
      textColor: Colors.white,
      fontSize: 16.0);
}

// void showADialog(
//     {Widget widget,
//     String title,
//     String desc,
//     Function onCancel,
//     Function onConfirm}) {
//   Widget comp = Container();
//   if (widget != null) {
//     comp = widget;
//   } else {
//     comp = ADialog(
//       title: title,
//       desc: desc,
//       onCancel: onCancel,
//       onConfirm: onConfirm,
//     );
//   }
//   Get.dialog(Scaffold(
//     backgroundColor: Colors.transparent,
//     body: comp,
//   ));
// }

String dayCounter(number) {
  if (number == null) return 'NAN';

  if (number < 0) return 'Expired (${number.abs()})';
  if (number == 0) return 'Today';
  if (number > 0) {
    if (number == 1) {
      return 'Urgent';
    }
    if (number >= 2 && number <= 6) {
      return '$number Day More';
    }
    if (number == 7) {
      return 'One Week More';
    }
    return '$number Days';
  }
  return 'NAN';
}

bool isInteger(num value) => value is int || value == value.roundToDouble();

bool isNumeric(String? s) {
  if (s == null) {
    return false;
  }
  return double.tryParse(s) != null;
}
