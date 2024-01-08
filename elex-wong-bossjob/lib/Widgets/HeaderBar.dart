import 'package:bossjobapp/Constants/constant.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/SearchJobController.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Services/LogService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Constants/color.dart';

class HeaderBar extends StatelessWidget with PreferredSizeWidget {
  const HeaderBar({
    Key? key,
    this.isShowOnBack = false,
    this.onBackClick,
    this.isShowSearch = false,
    this.isShowClear = false,
    this.isClear = false,
    this.isShowApply = false,
    this.isShowSkip = false,
    this.jobId = 0,
    this.title = '',
    this.price = '',
    this.jobSkills = const [],
    this.companyName = '',
    this.location = '',
    this.graduate = '',
    this.time = '',
    this.year = '',
  }) : super(key: key);
  final bool isShowOnBack;
  final Function? onBackClick;
  final bool isShowSearch;
  final bool isShowClear;
  final bool isClear;
  final bool isShowApply;
  final bool isShowSkip;
  final int jobId;
  final String title;
  final String price;
  final List jobSkills;
  final String companyName;
  final String location;
  final String graduate;
  final String time;
  final String year;

  @override
  Widget build(BuildContext context) {
    SearchJobController searchJobController = Get.put(SearchJobController());
    LogService logService = Get.put(LogService());
    return Container(
      decoration: BoxDecoration(color: Colors.white, boxShadow: [BoxShadow()]),
      padding: EdgeInsets.only(top: statusBarHeight + 10, bottom: 10),
      child: Row(
        children: [
          isShowOnBack
              ? IconButton(
                  icon: Icon(
                    Icons.arrow_back_ios,
                    color: icon,
                  ),
                  onPressed: () {
                    if (onBackClick != null) {
                      onBackClick!();
                    } else {
                      Get.back();
                    }
                  })
              : SizedBox(width: 10),
          InkWell(
            onDoubleTap: () {
              logService.toggle();
            },
            child: Image.asset(
              logo,
              scale: 1.5,
            ),
          ),
          Flexible(fit: FlexFit.tight, child: SizedBox()),
          isShowSearch == true
              ? IconButton(
                  icon: Icon(
                    Icons.search,
                    color: icon,
                  ),
                  alignment: Alignment.centerRight,
                  onPressed: () {
                    Get.back();
                  })
              : SizedBox(width: 10),
          isShowClear == true
              ? IconButton(
                  icon: Icon(
                    Icons.clear,
                    color: icon,
                  ),
                  alignment: Alignment.centerRight,
                  onPressed: () {
                    Get.back();
                    if (isClear == true) {
                      searchJobController.clearInput();
                    }
                  })
              : SizedBox(width: 10),
          isShowApply == true
              ? Padding(
                  padding: const EdgeInsets.only(right: 30),
                  child: InkWell(
                    onTap: () {
                      AppController appController = Get.put(AppController());
                      appController.userInfo.value.data!
                                  .isProfileUpdateRequired ==
                              true
                          ? Get.toNamed('/applyJob')
                          : Get.toNamed('/applyJobSimple', arguments: {
                              'jobId': jobId,
                              'title': title,
                              'price': price,
                              'jobSkills': jobSkills,
                              'companyName': companyName,
                              'location': location,
                              'graduate': graduate,
                              'time': time,
                              'year': year,
                            });
                    },
                    child: Container(
                      padding: EdgeInsets.symmetric(vertical: 5),
                      alignment: Alignment.center,
                      width: w(context, 0.20),
                      decoration: BoxDecoration(
                        color: primaryColor,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        'Apply',
                        style: TextStyle(color: Colors.white, fontSize: 14),
                      ),
                    ),
                  ),
                )
              : SizedBox(width: 10),
          isShowSkip == true
              ? Padding(
                  padding: const EdgeInsets.only(right: 30),
                  child: InkWell(
                    onTap: () {
                      AnalyticsService().skipInfo("onboarding");
                      Get.toNamed('/index');
                    },
                    child: Text(
                      'Skip',
                      style: TextStyle(color: Colors.black, fontSize: 15),
                    ),
                  ),
                )
              : SizedBox(width: 10),
        ],
      ),
    );
  }

  Size get preferredSize => Size.fromHeight(60);
}
