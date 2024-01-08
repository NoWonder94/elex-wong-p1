import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/ManageResumeController.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart';

class ManageResumeList {
  String title;
  VoidCallback onPressed;

  ManageResumeList(
    this.title,
    this.onPressed,
  );
}

class ManageResume extends StatelessWidget {
  const ManageResume({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    AppController appController = Get.put(AppController());
    ManageResumeController manageResumeController =
        Get.put(ManageResumeController());
    List<ManageResumeList> manageLists = [
      new ManageResumeList('Profile', () {
        Get.toNamed('/profileUpdate');
      }),
      new ManageResumeList('Job Preferences', () {
        Get.toNamed('/jobPreference');
      }),
      new ManageResumeList('Work Experience', () {
        Get.toNamed('/workExperience');
      }),
      new ManageResumeList('Education', () {
        Get.toNamed('/educationExperience');
      }),
      new ManageResumeList('Skills / Software', () {
        Get.toNamed('/skillsSoftware');
      }),
    ];

    return Scaffold(
      appBar: HeaderBar(
        isShowOnBack: true,
      ),
      body: Container(
        decoration: BoxDecoration(color: background),
        padding: EdgeInsets.only(top: 20.0, left: 25.0, right: 25.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            /* manage resume list */
            manageResumeNavList(manageLists),
            /* resume */
            Container(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Resume',
                    style: TextStyle(
                      color: jobText,
                      fontSize: 15.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 10.0),
                  Obx(() {
                    if (manageResumeController.loading.value)
                      return Container(
                        child: Column(
                          children: [
                            SpinKitWave(
                              color: primaryColor,
                            ),
                          ],
                        ),
                      );
                    return InkWell(
                      onTap: () {
                        manageResumeController.updateResume();
                      },
                      child: Image.asset(uploadResume),
                    );
                  }),
                  SizedBox(height: 10.0),
                  /* display uploaded Resume */
                  Obx(() {
                    if (appController.userInfo.value.data!.latestResume == null)
                      return Container();
                    var displayName = '';
                    var url = '';
                    if (manageResumeController.filename.value.isNotEmpty) {
                      displayName = manageResumeController.filename.value;
                    } else if (appController.userInfo.value.data!.latestResume!
                        .filename!.isNotEmpty) {
                      displayName = appController
                          .userInfo.value.data!.latestResume!.filename!;
                      url =
                          appController.userInfo.value.data!.latestResume!.url!;
                    }
                    return Container(
                      width: double.infinity,
                      padding: EdgeInsets.symmetric(
                          vertical: 10.0, horizontal: 10.0),
                      decoration: BoxDecoration(
                        color: Color.fromARGB(255, 255, 255, 255),
                        border: Border.all(
                          color: searchBorder,
                        ),
                        borderRadius: BorderRadius.circular(5),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Flexible(
                            child: Text(
                              'Resume : ',
                              style: TextStyle(
                                color: primaryColor,
                              ),
                            ),
                          ),
                          Flexible(
                            child: InkWell(
                              onTap: () async {
                                if (url.isNotEmpty) {
                                  await canLaunch(url)
                                      ? await launch(url)
                                      : throw 'Could not launch $url';
                                }
                              },
                              child: Text(
                                displayName.toString(),
                                style: TextStyle(
                                  color: primaryColor,
                                ),
                                overflow: TextOverflow.clip,
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  }),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget manageResumeNavList(List<ManageResumeList> manageLists) {
    return Container(
      child: Column(
        children: manageLists
            .map(
              (list) => Column(
                children: [
                  InkWell(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          list.title,
                          style: TextStyle(
                            color: jobText,
                            fontSize: 15.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        IconButton(
                          padding: EdgeInsets.zero,
                          constraints: BoxConstraints(),
                          icon: Icon(
                            Icons.edit_outlined,
                            color: lightGrey,
                          ),
                          onPressed: list.onPressed,
                        ),
                      ],
                    ),
                    onTap: list.onPressed,
                  ),
                  Divider(),
                ],
              ),
            )
            .toList(),
      ),
    );
  }
}
