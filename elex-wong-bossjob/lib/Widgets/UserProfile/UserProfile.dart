import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class UserProfile extends StatelessWidget {
  const UserProfile({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    AppController appController = Get.find();
    return Row(
      children: [
        Obx(
          () => appController.userInfo.value.data!.avatar != null
              ? CircleAvatar(
                  backgroundImage: NetworkImage(
                    appController.userInfo.value.data!.avatar.toString(),
                  ),
                  radius: 35,
                )
              : CircleAvatar(
                  backgroundImage: AssetImage(defaultJobseekerAvatar),
                  radius: 35,
                ),
        ),
        SizedBox(width: 10.0),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Obx(() => Text(
                  appController.userInfo.value.data!.firstName.toString(),
                  style: TextStyle(
                    color: black,
                    fontSize: 17.0,
                  ),
                )),
            SizedBox(height: 5.0),
            Obx(() => Text(
                  appController.userInfo.value.data!.email.toString(),
                  style: TextStyle(
                    color: lightGrey,
                    fontSize: 13.0,
                  ),
                )),
            SizedBox(height: 3.0),
            Obx(
              () => appController.userInfo.value.data!.phoneNum != null
                  ? Text(
                      '+63 ' +
                          appController.userInfo.value.data!.phoneNum
                              .toString(),
                      style: TextStyle(
                        color: lightGrey,
                        fontSize: 13.0,
                      ),
                    )
                  : Text(
                      '+63 ',
                      style: TextStyle(
                        color: lightGrey,
                        fontSize: 13.0,
                      ),
                    ),
            ),
          ],
        ),
      ],
    );
  }
}
