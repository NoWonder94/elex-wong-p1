import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Widgets/Button.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class OnBoarding extends StatelessWidget {
  const OnBoarding({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 10),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Spacer(),
              Image.asset(logo),
              Spacer(),
              Button(
                onPressed: () {
                  Get.offAndToNamed('/applyJob');
                },
                label: 'Update Profile',
                textColor: Colors.white,
              ),
              SizedBox(
                height: 20,
              ),
              InkWell(
                onTap: () {
                  Get.offAndToNamed('/index');
                },
                child: Text(
                  'SKIP',
                  style: TextStyle(decoration: TextDecoration.underline),
                ),
              ),
              SizedBox(
                height: 50,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
