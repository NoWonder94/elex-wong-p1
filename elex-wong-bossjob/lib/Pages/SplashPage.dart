import 'dart:async';
import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Controllers/AuthController.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({Key? key}) : super(key: key);

  @override
  _SplashPageState createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  AuthController authController = Get.find();
  @override
  void initState() {
    Future.delayed(Duration(seconds: 1), () {
      if (authController.isLogin()) {
        Get.offAndToNamed('/index');
      } else {
        Get.offAndToNamed('/auth');
      }
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: background,
      body: Center(
        child: Image.asset(
          logo,
          width: w(context, 0.5),
        ),
      ),
    );
  }
}
