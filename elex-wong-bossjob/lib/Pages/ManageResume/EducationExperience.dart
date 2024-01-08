import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/EducationExperienceController.dart';
import 'package:bossjobapp/Models/UserProfileModel.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';

class EducationExperience extends StatelessWidget {
  const EducationExperience({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    AppController appController = Get.find();
    EducationExperienceController educationExperienceController =
        Get.put(EducationExperienceController());

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
                if (appController.userInfo.value.data!.educations!.isEmpty)
                  return Container();
                return Column(
                  children: appController.userInfo.value.data!.educations!
                      .asMap()
                      .map(
                        (index, education) => MapEntry(
                          index,
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Education ' + (index + 1).toString(),
                                style: inputLabel,
                              ),
                              SizedBox(height: 5.0),
                              educationExperienceCard(
                                  education, educationExperienceController),
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
                  Get.toNamed('/editEducationExperience');
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget educationExperienceCard(UserProfileModelDataEducations? education,
      EducationExperienceController educationExperienceController) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 20.0, vertical: 15.0),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: searchBorder),
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Image.asset(
                    universityGreyIcon,
                    scale: 1.5,
                  ),
                  SizedBox(width: 10.0),
                  if (education!.school!.isEmpty) Container(),
                  Container(
                    width: 200.0,
                    child: Text(
                      education.school.toString(),
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
                  Get.toNamed(
                    '/editEducationExperience',
                    arguments: {
                      'educationId': education.id,
                    },
                  );
                },
              ),
              /* delete */
              Obx(
                () => educationExperienceController.deleteLoading.value
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
                          educationExperienceController
                              .submitDeleteEducation(education.id);
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
                education.location.toString(),
                style: TextStyle(
                  color: socialButtonTextColor,
                ),
              ),
            ],
          ),
          SizedBox(height: 10.0),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Image.asset(
                educationGreyIcon,
                scale: 1.5,
              ),
              SizedBox(width: 10.0),
              Text(
                education.degree.toString(),
                style: TextStyle(
                  color: socialButtonTextColor,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
