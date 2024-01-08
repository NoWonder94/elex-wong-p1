import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:bossjobapp/Controllers/AppController.dart';

class FooterBar extends StatelessWidget {
  Widget build(BuildContext context) {
    AppController appController = Get.put(AppController());

    return Obx(() => BottomNavigationBar(
          currentIndex: appController.tabIndex.value,
          items: [
            BottomNavigationBarItem(
                icon: new Icon(
                  Icons.wallet_travel,
                ),
                label: 'Jobs'),
            BottomNavigationBarItem(
              icon: new Icon(
                Icons.message,
              ),
              label: 'Messages',
            ),
            BottomNavigationBarItem(
              icon: Icon(
                Icons.person,
              ),
              label: 'Profile',
            )
          ],
          onTap: appController.setTabIndex,
        ));
  }
}
