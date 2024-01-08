import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/AuthController.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Widgets/AppVersion.dart';
import 'package:bossjobapp/Widgets/UserProfile/ProfileNavList.dart';
import 'package:bossjobapp/Widgets/UserProfile/UploadResume.dart';
import 'package:bossjobapp/Widgets/UserProfile/UserProfile.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';

class ProfileList {
  Widget icon;
  String title;
  Function onPressed;
  bool isEndIcon;

  ProfileList(this.icon, this.title, this.onPressed, this.isEndIcon);
}

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  void initState() {
    AnalyticsService().clickProfile();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    AuthController authController = Get.find();
    AppController appController = Get.put(AppController());

    List<ProfileList> proList = [
      new ProfileList(
          Icon(Icons.edit_outlined, size: 24.0, color: messagesSearchIcon),
          'Account Setting', () {
        AnalyticsService().clickAccountSetting();
        Get.toNamed('/editProfile');
      }, true),
      new ProfileList(
          Icon(Icons.history, size: 24.0, color: messagesSearchIcon),
          'Application History', () {
        Get.toNamed('/profileHistory');
      }, true),
      new ProfileList(
          Image.asset(
            diamonds,
            scale: 2,
          ),
          'Bosspoints', () {
        Get.toNamed('/bosspoints');
      }, true),
      new ProfileList(
          Icon(Icons.logout, size: 24.0, color: messagesSearchIcon), 'Logout',
          () {
        authController.logout();
      }, false),
    ];

    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          padding: EdgeInsets.symmetric(
            vertical: 20.0,
            horizontal: 30.0,
          ),
          child: Obx(() {
            if (appController.isUserInfoLoading.value) {
              return SpinKitCircle(
                color: Colors.grey,
              );
            }

            return Column(
              children: [
                /* profile head */
                UserProfile(),
                SizedBox(height: 20.0),
                /* manage resume */
                UploadResume(),
                SizedBox(height: 20.0),
                /* profile page option */
                Divider(thickness: 1.5),
                ProfileNavList(proList: proList),
                AppVersion(),
              ],
            );
          }),
        ),
      ),
    );
  }
}
