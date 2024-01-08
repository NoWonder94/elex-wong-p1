import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/WorkExperienceController.dart';
import 'package:bossjobapp/Models/UserProfileModel.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';

class WorkExperience extends StatelessWidget {
  const WorkExperience({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    AppController appController = Get.find();
    WorkExperienceController workExperienceController =
        Get.put(WorkExperienceController());

    return Scaffold(
      appBar: HeaderBar(
        isShowOnBack: true,
      ),
      body: SingleChildScrollView(
        child: Container(
          decoration: BoxDecoration(
            color: background,
          ),
          padding:
              EdgeInsets.only(top: 25.0, left: 20.0, right: 20.0, bottom: 25.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              /* display card */
              Obx(() {
                if (appController.userInfo.value.data!.workXps!.isEmpty)
                  return Container();
                return Column(
                  children: appController.userInfo.value.data!.workXps!
                      .asMap()
                      .map(
                        (index, work) => MapEntry(
                          index,
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Work Experience ' + (index + 1).toString(),
                                style: inputLabel,
                              ),
                              SizedBox(height: 5.0),
                              experienceCard(work, workExperienceController),
                              SizedBox(height: 15.0),
                            ],
                          ),
                        ),
                      )
                      .values
                      .toList(),
                );
              }),
              SizedBox(height: 10.0),
              InkWell(
                child: Image.asset(addmore),
                onTap: () {
                  Get.toNamed('/editWorkExperience');
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget experienceCard(UserProfileModelDataWorkXps? work,
      WorkExperienceController workExperienceController) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 20.0, vertical: 15.0),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: searchBorder),
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Image.asset(
                    jobGreyIcon,
                    scale: 1.5,
                  ),
                  SizedBox(width: 15.0),
                  Container(
                    width: 200.0,
                    child: Text(
                      work!.jobTitle.toString(),
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: socialButtonTextColor,
                      ),
                    ),
                  ),
                ],
              ),
              IconButton(
                padding: EdgeInsets.zero,
                constraints: BoxConstraints(),
                icon: Icon(
                  Icons.edit_outlined,
                  color: lightGrey,
                ),
                onPressed: () {
                  Get.toNamed('/editWorkExperience', arguments: {
                    'workId': work.id,
                  });
                },
              ),
              Obx(
                () => workExperienceController.deleteLoading.value
                    ? SpinKitCircle(
                        color: Colors.grey,
                        size: 20.0,
                      )
                    : IconButton(
                        padding: EdgeInsets.zero,
                        constraints: BoxConstraints(),
                        icon: Icon(
                          Icons.delete,
                          color: lightGrey,
                        ),
                        onPressed: () {
                          workExperienceController.submitDeleteWork(work.id);
                        },
                      ),
              ),
            ],
          ),
          SizedBox(height: 10.0),
          Row(
            children: [
              Image.asset(
                locationGreyIcon,
                scale: 1.5,
              ),
              SizedBox(width: 10.0),
              Text(
                work.location.toString(),
                style: TextStyle(
                  color: socialButtonTextColor,
                ),
              ),
            ],
          ),
          SizedBox(height: 10.0),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Image.asset(
                    companyGreyIcon,
                    scale: 1.5,
                  ),
                  SizedBox(width: 10.0),
                  Container(
                    width: 220.0,
                    child: Text(
                      work.company.toString(),
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: socialButtonTextColor,
                      ),
                    ),
                  ),
                ],
              ),
              work.salary != null
                  ? Text(
                      '₱ ' + work.salary.toString(),
                      style: TextStyle(
                        color: socialButtonTextColor,
                      ),
                    )
                  : Container(),
            ],
          ),
        ],
      ),
    );
  }
}
