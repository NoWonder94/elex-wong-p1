import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Widgets/Button.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class UploadResume extends StatelessWidget {
  const UploadResume({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    AppController appController = Get.put(AppController());
    return Container(
      child: Column(
        children: [
          Button(
            label: 'Manage Resume',
            textColor: Colors.white,
            onPressed: () {
              AnalyticsService().clickManageResume();
              appController.userInfo.value.data!.isProfileUpdateRequired == true
                  ? Get.toNamed('/applyJob')
                  : Get.toNamed('/manageResume');
            },
          ),
        ],
      ),
    );
  }
}
