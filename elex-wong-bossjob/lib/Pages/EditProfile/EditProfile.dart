import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/common.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Widgets/Button.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class EditProfile extends StatelessWidget {
  const EditProfile({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    AppController appController = Get.put(AppController());

    return Scaffold(
      appBar: HeaderBar(
        isShowOnBack: true,
      ),
      body: Container(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.only(top: 30.0, left: 30.0, right: 30.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(height: 20.0),
                      /* edit info */
                      Obx(
                        () => appController
                                    .userInfo.value.data!.isEmailVerify ==
                                true
                            ? getDisplayInfoBox(
                                label: 'Email',
                                onPressed: () {
                                  Get.toNamed('/editEmail');
                                },
                                valueDisplay:
                                    appController.userInfo.value.data!.email,
                              )
                            : getVerifyEmail(appController),
                      ),
                      SizedBox(height: 15.0),
                      /* edit mobile */
                      Obx(
                        () =>
                            appController.userInfo.value.data!.phoneNum != null
                                ? getDisplayInfoBox(
                                    label: 'Mobile',
                                    onPressed: () {
                                      Get.toNamed('/editMobile');
                                    },
                                    valueDisplay: appController
                                        .userInfo.value.data!.phoneNum,
                                  )
                                : getDisplayInfoBox(
                                    label: 'Mobile',
                                    onPressed: () {
                                      Get.toNamed('/editMobile');
                                    },
                                    valueDisplay: '+63',
                                  ),
                      ),
                      SizedBox(height: 15.0),
                      /* reset password */
                      getDisplayInfoBox(
                        label: 'Current Password',
                        onPressed: () {
                          Get.toNamed('/editPassword');
                        },
                        valueDisplay: '**********',
                      ),
                      InkWell(
                        onTap: () {
                          // deactivate account
                          // set up the button
                          Widget okButton = ElevatedButton(
                            child: Text("OK"),
                            onPressed: () {
                              appController.deactivateAccount();
                            },
                          );
                          Widget cancelButton = ElevatedButton(
                            child: Text("Cancel"),
                            onPressed: () {
                              Get.back();
                            },
                          );
                          // set up the AlertDialog
                          AlertDialog alert = AlertDialog(
                            title: Text(
                                "Are you sure that you want to deactivate your account? "),
                            content: Text(
                                "Disabling your account will remove your information from places where other users can view your profile. You will not be able to access your account."),
                            actions: [
                              cancelButton,
                              okButton,
                            ],
                          );
                          // show the dialog
                          showDialog(
                            context: context,
                            builder: (BuildContext context) {
                              return alert;
                            },
                          );
                        },
                        child: Container(
                          decoration: BoxDecoration(
                            border: Border(
                              top: BorderSide(width: 1.0, color: divider),
                            ),
                          ),
                          padding: EdgeInsets.symmetric(vertical: 20.0),
                          child: Button(
                            label: 'Deactivate Account',
                            textColor: Colors.white,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Column getVerifyEmail(AppController appController) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Email',
          style: inputLabel,
        ),
        SizedBox(
          height: 5,
        ),
        Container(
          decoration: BoxDecoration(
            color: Colors.white,
            border: Border.all(
              color: inactiveInputBorder,
            ),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Row(
            children: [
              SizedBox(width: 13.0),
              Expanded(
                flex: 2,
                child: InkWell(
                  onTap: () {
                    Get.toNamed('/editEmail');
                  },
                  child: TextFormField(
                    decoration: InputDecoration(
                      hintText: appController.userInfo.value.data!.email,
                      disabledBorder: InputBorder.none,
                    ),
                    enabled: false,
                  ),
                ),
              ),
              Expanded(
                flex: 1,
                child: InkWell(
                  onTap: () {
                    // showVerifyLayout;
                    showVerifyEmail(callback: (success) {
                      if (success == 'changeEmail') {
                        Get.back();
                        Future.delayed(Duration(milliseconds: 500), () {
                          Get.toNamed('/editEmail');
                        });
                        return;
                      }
                      if (success) {
                        Get.back();
                        appController.getUserProfile();
                      }
                    });
                  },
                  child: Container(
                    decoration: BoxDecoration(
                      color: primaryColor,
                      borderRadius: BorderRadius.only(
                          topRight: Radius.circular(10.0),
                          bottomRight: Radius.circular(10.0)),
                    ),
                    height: 47.0,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Verify Email',
                          style: TextStyle(color: Colors.white, fontSize: 15.0),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Column getDisplayInfoBox({label, onPressed, valueDisplay}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: inputLabel,
        ),
        SizedBox(
          height: 5,
        ),
        Container(
          decoration: BoxDecoration(
            color: Colors.white,
            border: Border.all(
              color: inactiveInputBorder,
            ),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Row(
            children: [
              const SizedBox(width: 13.0),
              Expanded(
                flex: 4,
                child: InkWell(
                  onTap: onPressed,
                  child: TextFormField(
                    decoration: InputDecoration(
                      hintText: valueDisplay,
                      disabledBorder: InputBorder.none,
                    ),
                    enabled: false,
                  ),
                ),
              ),
              Expanded(
                flex: 1,
                child: IconButton(
                  padding: EdgeInsets.zero,
                  constraints: BoxConstraints(),
                  icon: Icon(
                    Icons.edit_outlined,
                    color: messagesSearchIcon,
                  ),
                  onPressed: onPressed,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
