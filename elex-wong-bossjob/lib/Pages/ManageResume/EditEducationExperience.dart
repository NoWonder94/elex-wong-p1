import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/constant.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/EditEducationExpController.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:bossjobapp/Widgets/Checkbox.dart';
import 'package:bossjobapp/Widgets/FooterSubmitButton.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/ManageResume/DropDownSearch.dart';
import 'package:bossjobapp/Widgets/ManageResume/FormInput.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

class EditEducationExperience extends StatefulWidget {
  const EditEducationExperience({Key? key}) : super(key: key);

  @override
  State<EditEducationExperience> createState() =>
      _EditEducationExperienceState();
}

class _EditEducationExperienceState extends State<EditEducationExperience> {
  EditEducationExpController editEducationExpController =
      Get.put(EditEducationExpController());
  ConfigService configService = Get.find();

  @override
  void initState() {
    super.initState();
    /* pass id to controller */
    if (Get.arguments != null) {
      editEducationExpController
          .getUserEducationInfo(Get.arguments['educationId']);
    }
    /* pass id to controller */
  }

  @override
  Widget build(BuildContext context) {
    List<String> educationLevel = ['Diploma', 'Bachelor', 'Master', 'Doctor'];

    DateTime? selectedStartDateEdu;
    DateTime? selectedEndDateEdu;

    Future<void> _selectStartDateEdu(BuildContext context) async {
      if (editEducationExpController.educationsInfo.value.studyPeriodFrom !=
          null) {
        selectedStartDateEdu = new DateFormat("yyyy-MM-dd").parse(
            editEducationExpController.educationsInfo.value.studyPeriodFrom
                .toString());
      } else {
        selectedStartDateEdu = DateTime.now();
      }

      final DateTime? picked = await showDatePicker(
          context: context,
          initialDate: selectedStartDateEdu!,
          firstDate: DateTime(1950, 1),
          lastDate: DateTime.now());
      if (picked != null && picked != selectedStartDateEdu)
        setState(() {
          selectedStartDateEdu = picked;
        });

      String date = DateFormat("yyyy-MM-dd").format(selectedStartDateEdu!);
      editEducationExpController.setStartDateEdu(date);
    }

    Future<void> _selectEndDateEdu(BuildContext context) async {
      if (editEducationExpController.educationsInfo.value.studyPeriodTo !=
          null) {
        selectedEndDateEdu = new DateFormat("yyyy-MM-dd").parse(
            editEducationExpController.educationsInfo.value.studyPeriodTo
                .toString());
      } else {
        selectedEndDateEdu = DateTime.now();
      }
      final DateTime? picked = await showDatePicker(
          context: context,
          initialDate: selectedEndDateEdu!,
          firstDate: DateTime(1950, 1),
          lastDate: DateTime.now());
      if (picked != null && picked != selectedEndDateEdu)
        setState(() {
          selectedEndDateEdu = picked;
        });
      String date = DateFormat("yyyy-MM-dd").format(selectedEndDateEdu!);
      editEducationExpController.setEndDateEdu(date);
    }

    return Scaffold(
      appBar: HeaderBar(
        isShowOnBack: true,
      ),
      body: Stack(
        children: [
          Obx(() {
            if (editEducationExpController.isApiLoading.value == true) {
              return Center(
                child: CircularProgressIndicator(),
              );
            }
            return SingleChildScrollView(
              child: Container(
                padding: EdgeInsets.only(
                    top: 25.0, left: 20.0, right: 20.0, bottom: 130.0),
                child: Column(
                  children: [
                    SizedBox(height: 15.0),
                    /* school name */
                    Container(
                      child: Column(
                        children: [
                          Obx(
                            () => editEducationExpController
                                        .selectedSchool.value.name ==
                                    null
                                ? getInputWidget(
                                    label: 'School Name',
                                    hintText: 'eg. University',
                                    initialValue: editEducationExpController
                                            .selectedSchool.value.name ??
                                        "",
                                    onChange: (val) {
                                      editEducationExpController
                                          .updateSeletedSchoolName(val);
                                      editEducationExpController
                                          .searchSchoolFilter(val);
                                    })
                                : Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        'School Name',
                                        style: inputLabel,
                                      ),
                                      SizedBox(
                                        height: 5,
                                      ),
                                      Container(
                                        padding: EdgeInsets.symmetric(
                                            horizontal: defaultPadding / 2,
                                            vertical: defaultPadding),
                                        width: double.infinity,
                                        decoration: BoxDecoration(
                                            color: Colors.white,
                                            borderRadius:
                                                BorderRadius.circular(10),
                                            border: Border.all(
                                                color: searchBorder)),
                                        child: Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            Expanded(
                                              flex: 9,
                                              child: Text(
                                                editEducationExpController
                                                    .selectedSchool.value.name
                                                    .toString(),
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                            Expanded(
                                              flex: 1,
                                              child: InkWell(
                                                onTap: () {
                                                  editEducationExpController
                                                      .removeSeletedSchool();
                                                },
                                                child: Icon(
                                                  Icons.close,
                                                  size: 15,
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          Obx(() {
                            if (editEducationExpController
                                .schoolLoading.value) {
                              return SpinKitWave(
                                color: primaryColor,
                                size: 15,
                              );
                            }
                            if (editEducationExpController
                                    .schoolFilterModel.value.data !=
                                null) {
                              return Wrap(
                                children: editEducationExpController
                                    .schoolFilterModel.value.data!.schools!
                                    .map((e) => Container(
                                          margin: EdgeInsets.only(
                                              right: 10, bottom: 5),
                                          padding: EdgeInsets.all(5),
                                          decoration: BoxDecoration(
                                              color: editEducationExpController
                                                          .selectedSchool
                                                          .value ==
                                                      e
                                                  ? primaryColor
                                                  : Colors.white,
                                              borderRadius:
                                                  BorderRadius.circular(10),
                                              border: Border.all(
                                                  color: searchBorder)),
                                          child: InkWell(
                                              onTap: () {
                                                editEducationExpController
                                                    .updateSeletedSchool(e);
                                              },
                                              child: Text(
                                                e!.name!.toString(),
                                                style: TextStyle(
                                                    fontSize: 12,
                                                    color: editEducationExpController
                                                                .selectedSchool
                                                                .value ==
                                                            e
                                                        ? Colors.white
                                                        : Colors.black),
                                              )),
                                        ))
                                    .toList(),
                              );
                            }
                            return Container();
                          })
                        ],
                      ),
                    ),
                    /* school name end */
                    SizedBox(height: 15.0),
                    /* study field */
                    getInputWidget(
                      label: 'Field of Study',
                      hintText: 'eg. Accounting',
                      initialValue: editEducationExpController.studyField.value,
                      onChange: (val) {
                        editEducationExpController.setStudyFeild(val);
                      },
                    ),
                    /* study field end */
                    SizedBox(height: 15.0),
                    /* education level */
                    getDropDownSearch(
                      educationLevel,
                      label: 'Education Level',
                      hintText: "Select Education Level",
                      onChange: (val) {
                        editEducationExpController.setEducation(val);
                      },
                      selectedItem: editEducationExpController.education,
                    ),
                    /* education level end */
                    SizedBox(height: 15.0),
                    /* location */
                    getDropDownSearch(
                      configService.getLocationList(),
                      label: 'Location',
                      hintText: 'Select Location ',
                      selectedItem: editEducationExpController.locationEdu,
                      onChange: (val) {
                        editEducationExpController.setLocationEdu(val);
                      },
                    ),
                    /* location end */
                    SizedBox(height: 15.0),
                    /* study duration */
                    Container(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Start Date',
                            style: inputLabel,
                          ),
                          SizedBox(
                            height: 5,
                          ),
                          InkWell(
                              onTap: () => _selectStartDateEdu(context),
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
                                    if (editEducationExpController
                                            .startDateEdu.value ==
                                        '') {
                                      selectedStartDateEdu = DateTime.now();
                                      return Text(
                                          "${selectedStartDateEdu!.toLocal()}"
                                              .split(' ')[0],
                                          style: inputText);
                                    }
                                    return Text(
                                        editEducationExpController
                                            .startDateEdu.value,
                                        style: inputText);
                                  }))),
                        ],
                      ),
                    ),
                    SizedBox(height: 15.0),
                    Obx(() {
                      if (editEducationExpController.checkboxEdu.value ==
                          true) {
                        return Container();
                      }
                      return Container(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'End Date',
                              style: inputLabel,
                            ),
                            SizedBox(
                              height: 5,
                            ),
                            InkWell(
                              onTap: () => _selectEndDateEdu(context),
                              child: Container(
                                width: double.infinity,
                                padding: EdgeInsets.symmetric(
                                    vertical: 15.0, horizontal: 10.0),
                                decoration: BoxDecoration(
                                  border:
                                      Border.all(color: socialButtonTextColor),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: Obx(
                                  () {
                                    if (editEducationExpController
                                            .endDateEdu.value ==
                                        '') {
                                      selectedEndDateEdu = DateTime.now();

                                      return Text(
                                          "${selectedEndDateEdu!.toLocal()}"
                                              .split(' ')[0],
                                          style: inputText);
                                    }
                                    return Text(
                                        editEducationExpController.endDateEdu
                                            .toString(),
                                        style: inputText);
                                  },
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    }),
                    SizedBox(height: 15.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CheckBox(
                            isActive:
                                editEducationExpController.checkboxEdu.value,
                            onChange: () {
                              setState(() {
                                editEducationExpController.setCheckboxEdu(
                                    !editEducationExpController
                                        .checkboxEdu.value);
                              });
                            }),
                        SizedBox(
                          width: 10,
                        ),
                        Text('Present'),
                      ],
                    ),
                    /* study duration end */
                  ],
                ),
              ),
            );
          }),
          /* save button */
          Obx(() {
            if (editEducationExpController.isApiLoading.value == true) {
              return Container();
            }

            return Align(
              alignment: Alignment.bottomCenter,
              child: FooterSubmitButton(
                label: 'Update',
                onPressed: () {
                  if (Get.arguments != null) {
                    editEducationExpController
                        .updateEducation(Get.arguments['educationId']);
                  } else {
                    editEducationExpController.submitEducation();
                  }
                },
              ),
            );
          })
        ],
      ),
    );
  }
}
