import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/ProfileUpdateController.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:bossjobapp/Widgets/FooterSubmitButton.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/ManageResume/DropDownSearch.dart';
import 'package:bossjobapp/Widgets/ManageResume/FormInput.dart';
import 'package:bossjobapp/Widgets/ManageResume/MultilineInput.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

class ProfileUpdate extends StatefulWidget {
  const ProfileUpdate({Key? key}) : super(key: key);
  @override
  State<StatefulWidget> createState() => new _ProfileUpdateState();
}

class _ProfileUpdateState extends State<ProfileUpdate> {
  ConfigService configService = Get.find();
  AppController appController = Get.find();

  ProfileUpdateController profileUpdateController =
      Get.put(ProfileUpdateController());

  List<String> availability = [
    'Immediate',
    'One week',
    'Two weeks',
    'Three weeks',
    'One month',
    'Two months or above',
  ];

  DateTime? selectedDate;

  Future<void> _selectDate(BuildContext context) async {
    if (appController.userInfo.value.data!.birthdate != null) {
      selectedDate = new DateFormat("yyyy-MM-dd")
          .parse(appController.userInfo.value.data!.birthdate.toString());
    }

    final DateTime? picked = await showDatePicker(
        context: context,
        initialDate: selectedDate!,
        firstDate: DateTime(1950, 1),
        lastDate: DateTime.now());
    if (picked != null && picked != selectedDate)
      setState(() {
        selectedDate = picked;
      });
    String date = DateFormat("yyyy-MM-dd").format(selectedDate!);
    profileUpdateController.setBirthdate(date);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: HeaderBar(
        isShowOnBack: true,
      ),
      body: Stack(
        children: [
          Obx(() {
            if (appController.isUserInfoLoading.value == true) {
              return Center(
                child: CircularProgressIndicator(),
              );
            }
            return SingleChildScrollView(
              child: Container(
                padding: EdgeInsets.only(
                    top: 25.0, left: 20.0, right: 20.0, bottom: 100.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Obx(
                      () => appController.userInfo.value.data!.avatar != null
                          ? InkWell(
                              onTap: () {
                                profileUpdateController.uploadAvatar();
                              },
                              child: Stack(
                                children: [
                                  CircleAvatar(
                                    backgroundImage: NetworkImage(
                                      appController.userInfo.value.data!.avatar
                                          .toString(),
                                    ),
                                    radius: 35,
                                  ),
                                  Positioned(
                                    bottom: 0,
                                    right: 0,
                                    child: Container(
                                      padding: EdgeInsets.all(5),
                                      decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(120),
                                          color: Colors.black26),
                                      child: Icon(
                                        Icons.edit,
                                        color: Colors.white,
                                      ),
                                    ),
                                  )
                                ],
                              ),
                            )
                          : InkWell(
                              onTap: () {
                                profileUpdateController.uploadAvatar();
                              },
                              child: Image.asset(uploadProPic),
                            ),
                    ),
                    SizedBox(height: 15.0),
                    Row(
                      children: [
                        Expanded(
                          flex: 1,
                          child: getInputWidget(
                              label: 'Name',
                              initialValue:
                                  appController.userInfo.value.data!.firstName,
                              onChange: (v) {
                                profileUpdateController.setFirstName(v);
                              }),
                        ),
                        SizedBox(width: 10.0),
                        Expanded(
                          flex: 1,
                          child: getInputWidget(
                              label: '',
                              initialValue:
                                  appController.userInfo.value.data!.lastName,
                              onChange: (v) {
                                profileUpdateController.setLastName(v);
                              }),
                        ),
                      ],
                    ),
                    SizedBox(height: 15.0),
                    Container(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Birthday',
                            style: inputLabel,
                          ),
                          SizedBox(
                            height: 5,
                          ),
                          InkWell(
                              onTap: () => _selectDate(context),
                              child: Container(
                                  width: double.infinity,
                                  padding: EdgeInsets.symmetric(
                                      vertical: 15.0, horizontal: 10.0),
                                  decoration: BoxDecoration(
                                    border: Border.all(
                                        color: socialButtonTextColor),
                                    borderRadius: BorderRadius.circular(10),
                                  ),
                                  child: Obx(() {
                                    // if (selectedDate != null) {
                                    //   return Text(
                                    //       "${selectedDate!.toLocal()}"
                                    //           .split(' ')[0],
                                    //       style: inputText);
                                    // } else
                                    if (appController
                                            .userInfo.value.data!.birthdate ==
                                        null) {
                                      selectedDate = DateTime.now();
                                      return Text(
                                          "${selectedDate!.toLocal()}"
                                              .split(' ')[0],
                                          style: inputText);
                                    }
                                    return Text(
                                        appController
                                            .userInfo.value.data!.birthdate
                                            .toString(),
                                        style: inputText);
                                  }))
                              // Text(
                              // "${selectedDate.toLocal()}".split(' ')[0],
                              // style: inputText),
                              ),
                        ],
                      ),
                    ),
                    SizedBox(height: 15.0),
                    getDropDownSearch(
                      configService.getLocationList(),
                      label: 'Current Location ',
                      hintText: 'Select Location ',
                      selectedItem:
                          appController.userInfo.value.data!.location ??
                              'Select Location',
                      onChange: (v) {
                        profileUpdateController.setLocationKey(v);
                      },
                    ),
                    SizedBox(height: 15.0),
                    getDropDownSearch(
                      configService.getExperienceList(),
                      label: 'Years of Experience',
                      hintText: 'Select Experience ',
                      onChange: (v) {
                        profileUpdateController.setExperience(v);
                      },
                      selectedItem: appController.userInfo.value.data!.xpLvl ??
                          'Select Experience',
                    ),
                    SizedBox(height: 15.0),
                    getDropDownSearch(
                      availability,
                      label: 'Availability',
                      onChange: (v) {
                        profileUpdateController
                            .setNoticePeriod(availability.indexOf(v) + 1);
                      },
                      selectedItem:
                          appController.userInfo.value.data!.noticePeriod ?? '',
                    ),
                    SizedBox(height: 15.0),
                    getMultilineInput(
                      label: 'Description',
                      hintText: 'Short description about you…',
                      maxLines: 8,
                      onchange: (v) {
                        profileUpdateController.setDescription(v);
                      },
                      initialValue:
                          appController.userInfo.value.data!.description,
                    ),
                  ],
                ),
              ),
            );
          }),
          /* save button */
          Obx(() {
            if (appController.isUserInfoLoading.value == true) {
              return Container();
            }
            return Align(
              alignment: Alignment.bottomCenter,
              child: FooterSubmitButton(
                label: 'Update',
                onPressed: () {
                  profileUpdateController.uploadMe();
                },
              ),
            );
          }),
        ],
      ),
    );
  }
}
