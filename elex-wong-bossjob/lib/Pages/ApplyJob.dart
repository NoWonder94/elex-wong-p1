import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/constant.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/ApplyController.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:bossjobapp/Widgets/Button.dart';
import 'package:bossjobapp/Widgets/ManageResume/FormNumberInput.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/FooterSubmitButton.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Widgets/ManageResume/FormInput.dart';
import 'package:bossjobapp/Widgets/ManageResume/DropDownSearch.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Widgets/RangeBar.dart';
import 'package:intl/intl.dart';
import 'package:bossjobapp/Widgets/Checkbox.dart';

class ApplyJob extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new _ApplyJobState();
}

class _ApplyJobState extends State<ApplyJob> {
  ApplyController applyController = Get.put(ApplyController());
  AppController appController = Get.put(AppController());
  final _stepsText = [
    "Complete Information",
    "Recent Working Experience",
    "Higher Qualification"
  ];
  String getHeaderText(context, ApplyController applyController) {
    switch (applyController.curPage.value) {
      case 1:
        return _stepsText[0].toString();
      case 2:
        return _stepsText[1].toString();
      case 3:
        return _stepsText[2].toString();
    }
    return '';
  }

  /* new header steps */
  Widget getHeaderSteps() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(height: 10),
          Obx(() => Text(
                getHeaderText(context, applyController),
                style: TextStyle(fontWeight: FontWeight.bold),
              )),
          SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                decoration: BoxDecoration(
                  border: Border.all(
                    color: Color.fromARGB(255, 225, 226, 226),
                  ),
                  borderRadius: BorderRadius.circular(50.0),
                ),
                padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 5.0),
                child: Obx(
                  () => Text(
                    '1',
                    style: applyController.curPage.value == 1
                        ? TextStyle(color: Colors.blue)
                        : TextStyle(color: Colors.black),
                  ),
                ),
              ),
              Expanded(
                child: new Container(
                  child: Divider(
                      thickness: 2.0,
                      color: Color.fromARGB(255, 226, 226, 226),
                      height: 36),
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  border: Border.all(
                    color: Color.fromARGB(255, 225, 226, 226),
                  ),
                  borderRadius: BorderRadius.circular(50.0),
                ),
                padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 5.0),
                child: Obx(
                  () => Text(
                    '2',
                    style: applyController.curPage.value == 2
                        ? TextStyle(color: Colors.blue)
                        : TextStyle(color: Colors.black),
                  ),
                ),
              ),
              Expanded(
                child: new Container(
                  child: Divider(
                      thickness: 2.0,
                      color: Color.fromARGB(255, 226, 226, 226),
                      height: 36),
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  border: Border.all(
                    color: Color.fromARGB(255, 225, 226, 226),
                  ),
                  borderRadius: BorderRadius.circular(50.0),
                ),
                padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 5.0),
                child: Obx(
                  () => Text(
                    '3',
                    style: applyController.curPage.value == 3
                        ? TextStyle(color: Colors.blue)
                        : TextStyle(color: Colors.black),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
  /* new header steps */

  Widget getCustomContainer(
      context, ApplyController applyController, AppController appController) {
    switch (applyController.curPage.value) {
      case 1:
        return information(context, applyController, appController);
      case 2:
        return experience(context, applyController);

      case 3:
        return qualification(context, applyController);
      // case 4:
      //   return Container(
      //     child: Text('open modal'),
      //   );
    }
    return Container();
  }

  @override
  Widget build(BuildContext context) {
    ApplyController applyController = Get.put(ApplyController());

    return WillPopScope(
      onWillPop: () async => false,
      child: Scaffold(
        backgroundColor: background,
        appBar: HeaderBar(
          isShowOnBack: true,
          onBackClick: () {
            if (applyController.curPage.value.toInt() == 1) {
              Get.back();
            } else {
              applyController.setCurPage(applyController.curPage.value - 1);
            }
          },
        ),
        body: Stack(children: [
          SingleChildScrollView(
            child: Column(
              children: [
                /* new header steps */
                Container(
                  // height: 20.0,
                  child: getHeaderSteps(),
                ),
                /* new header steps */
                Obx(() {
                  if (appController.isUserInfoLoading.value == true ||
                      applyController.isApiLoading.value == true) {
                    return Center(
                      child: CircularProgressIndicator(),
                    );
                  }
                  return getCustomContainer(
                      context, applyController, appController);
                }),
                SizedBox(
                  height: 180.0,
                ),
              ],
            ),
          ),
          Obx(() {
            if (appController.isUserInfoLoading.value == true ||
                applyController.isApiLoading.value == true) {
              return Container();
            }
            return Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                  child: Wrap(
                children: [
                  if (applyController.curPage.value.toInt() == 1)
                    FooterSubmitButton(
                      label: 'Next',
                      onPressed: () {
                        applyController.uploadStepOne();
                      },
                    ),
                  if (applyController.curPage.value.toInt() == 2)
                    Container(
                      height: 155.0,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        border: Border(
                          top: BorderSide(width: 1.0, color: divider),
                        ),
                      ),
                      padding: EdgeInsets.symmetric(
                          vertical: 20.0, horizontal: 20.0),
                      child: Column(
                        children: [
                          Button(
                            label: 'I am fresh graduate',
                            backgroundColor: Colors.white,
                            textColor: tabText,
                            onPressed: () {
                              applyController.setStepThreeInitValue();
                              applyController.setCurPage(
                                  applyController.curPage.value + 1);
                            },
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          Button(
                            label: 'Next',
                            backgroundColor: primaryColor,
                            textColor: Colors.white,
                            onPressed: () {
                              applyController.uploadStepTwo();
                            },
                          ),
                        ],
                      ),
                    ),
                  if (applyController.curPage.value.toInt() == 3)
                    FooterSubmitButton(
                      label: 'Next',
                      onPressed: () {
                        applyController.uploadStepThree();
                      },
                    ),
                ],
              )),
            );
          }),
        ]),
      ),
    );
  }

  Widget information(
      context, ApplyController controller, AppController appController) {
    List<String> availability = [
      'Immediate',
      'One week',
      'Two weeks',
      'Three weeks',
      'One month',
      'Two months or above',
    ];
    ConfigService configService = Get.find();
    return Container(
      padding: EdgeInsets.only(
        top: 25,
        left: 20,
        right: 20,
        bottom: 0,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          getInputWidget(
            label: 'Mobile',
            hintText: '+06 0123 4567',
            initialValue: controller.phone.value,
            onChange: (v) {
              controller.setPhone(v);
            },
          ),
          SizedBox(height: 10.0),
          getDropDownSearch(
            configService.getLocationList(),
            label: 'Current Location ',
            hintText: 'Select Location ',
            selectedItem: controller.location.value,
            onChange: (v) {
              controller.setLocation(v);
            },
          ),
          SizedBox(height: 10.0),
          Container(
              child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Preferred Specialization',
                style: inputLabel,
              ),
              SizedBox(height: 5),
              Obx(() {
                if (controller.selectedSpecialization.length == 0) {
                  Container();
                }

                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: controller.selectedSpecialization
                      .map(
                        (element) => Container(
                          padding: EdgeInsets.only(bottom: 5),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                element.toString(),
                                style: inputText,
                              ),
                              InkWell(
                                onTap: () {
                                  controller
                                      .removeSelectedSpecialization(element);
                                },
                                child: Icon(
                                  Icons.close,
                                  size: 15,
                                ),
                              ),
                            ],
                          ),
                        ),
                      )
                      .toList(),
                );
              }),
              SizedBox(
                height: 5,
              ),
              // Job Category Dropdown
              Obx(() {
                if (controller.selectedSpecialization.length > 2) {
                  return Container();
                }

                return getDropDownSearch(
                  configService.getSpecializationList(),
                  label: '+ Add category (max. 3 categories)',
                  hintText: '+ Add category (max. 3 categories)',
                  selectedItem: '+ Add category (max. 3 categories)',
                  onChange: (v) {
                    controller.updateSelectedSpecialization(v);
                  },
                );
              }),
            ],
          )),
          SizedBox(height: 10.0),
          getDropDownSearch(
            availability,
            label: 'Availability',
            hintText: 'Select Availability',
            onChange: (v) {
              controller.setAvailabilityIndex(availability.indexOf(v) + 1);
            },
            selectedItem: appController.userInfo.value.data!.noticePeriod ?? '',
          ),
          SizedBox(height: 10.0),
          Container(
            padding: EdgeInsets.only(top: 30.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Expected Salary',
                  style: inputLabel,
                ),
                SizedBox(height: 10.0),
                RangeBar(
                  labelLeft: 'From',
                  labelRight: 'To',
                  onChanged: (v) {
                    controller.updateSalaryRange(v);
                  },
                ),
              ],
            ),
          ),
          SizedBox(height: 10.0),
          Container(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Resume',
                  style: inputLabel,
                ),
                SizedBox(height: 10.0),
                Obx(() {
                  if (applyController.isAutoGenerateResume.value) {
                    return Container();
                  }
                  if (controller.loading.value)
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
                      controller.updateResume();
                    },
                    child: Image.asset(
                      uploadResume,
                      fit: BoxFit.contain,
                    ),
                  );
                }),
                SizedBox(height: 10.0),
                Obx(() {
                  if (appController.userInfo.value.data!.latestResume == null)
                    return Container();
                  var displayName = '';
                  if (controller.filename.value.isNotEmpty) {
                    displayName = controller.filename.value;
                  } else if (appController.userInfo.value.data!.latestResume!
                      .filename!.isNotEmpty) {
                    displayName = appController
                        .userInfo.value.data!.latestResume!.filename!;
                  }
                  return Container(
                    width: double.infinity,
                    padding:
                        EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),
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
                          child: Text(
                            displayName.toString(),
                            style: TextStyle(
                              color: primaryColor,
                            ),
                            overflow: TextOverflow.clip,
                          ),
                        ),
                      ],
                    ),
                  );
                }),
                Obx(() => Row(
                      children: [
                        Checkbox(
                            value: applyController.isAutoGenerateResume.value,
                            onChanged: (v) {
                              applyController.isAutoGenerateResume.value = v!;
                            }),
                        Text('Create a Bossjob resume'),
                      ],
                    )),
              ],
            ),
          ),
          SizedBox(height: 10.0),
        ],
      ),
    );
  }

  Widget experience(context, ApplyController controller) {
    DateTime? selectedStartDate;
    DateTime? selectedEndDate;
    Future<void> _selectStartDate(BuildContext context) async {
      if (controller.startDate.value != '') {
        selectedStartDate = new DateFormat("yyyy-MM-dd")
            .parse(controller.startDate.value.toString());
      } else {
        selectedStartDate = DateTime.now();
      }
      final DateTime? picked = await showDatePicker(
          context: context,
          initialDate: selectedStartDate!,
          firstDate: DateTime(1950, 1),
          lastDate: DateTime.now());
      if (picked != null && picked != selectedStartDate)
        setState(() {
          selectedStartDate = picked;
        });

      String date = DateFormat("yyyy-MM-dd").format(selectedStartDate!);
      controller.setStartDate(date);
    }

    Future<void> _selectEndDate(BuildContext context) async {
      if (controller.endDate.value != '') {
        selectedEndDate = new DateFormat("yyyy-MM-dd")
            .parse(controller.endDate.value.toString());
      } else {
        selectedEndDate = DateTime.now();
      }

      final DateTime? picked = await showDatePicker(
          context: context,
          initialDate: selectedEndDate!,
          firstDate: DateTime(1950, 1),
          lastDate: DateTime.now());
      if (picked != null && picked != selectedEndDate)
        setState(() {
          selectedEndDate = picked;
        });
      String date = DateFormat("yyyy-MM-dd").format(selectedEndDate!);
      controller.setEndDate(date);
    }

    ConfigService configService = Get.find();

    return Container(
      padding: EdgeInsets.only(
        top: 25,
        left: 20,
        right: 20,
        bottom: 0,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                controller.selectedJob.value.name == null
                    ? getInputWidget(
                        label: 'Job Title',
                        hintText: 'eg. Accountant',
                        initialValue: controller.selectedJob.value.name,
                        onChange: (v) {
                          controller.updateSeletedJobName(v);
                          controller.searchJob(v);
                        })
                    : Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Job Title',
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
                                borderRadius: BorderRadius.circular(10),
                                border: Border.all(color: searchBorder)),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(controller.selectedJob.value.name
                                    .toString()),
                                InkWell(
                                  onTap: () {
                                    controller.removeSeletedJob();
                                  },
                                  child: Icon(
                                    Icons.close,
                                    size: 15,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                SizedBox(
                  height: 10,
                ),
                Obx(() {
                  if (controller.jobLoading.value) {
                    return SpinKitWave(
                      color: primaryColor,
                      size: 15,
                    );
                  }
                  if (controller.jobFilterModel.value.data != null) {
                    return Wrap(
                      children: controller.jobFilterModel.value.data!.jobs!
                          .map((e) => Container(
                                margin: EdgeInsets.only(right: 10, bottom: 5),
                                padding: EdgeInsets.all(5),
                                decoration: BoxDecoration(
                                    color: controller.selectedJob.value == e
                                        ? primaryColor
                                        : Colors.white,
                                    borderRadius: BorderRadius.circular(10),
                                    border: Border.all(color: searchBorder)),
                                child: InkWell(
                                    onTap: () {
                                      controller.updateSeletedJob(e);
                                    },
                                    child: Text(
                                      e!.name!.toString(),
                                      style: TextStyle(
                                          fontSize: 12,
                                          color:
                                              controller.selectedJob.value == e
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
          SizedBox(height: 10.0),
          Container(
              child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Specialization',
                style: inputLabel,
              ),
              SizedBox(height: 5),
              Obx(() {
                if (controller.selectedSpecializationWorkingExp.length == 0) {
                  Container();
                }

                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: controller.selectedSpecializationWorkingExp
                      .map(
                        (element) => Container(
                          padding: EdgeInsets.only(bottom: 5),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                element.toString(),
                                style: inputText,
                              ),
                              InkWell(
                                onTap: () {
                                  controller
                                      .removeSelectedSpecializationWorkingExp(
                                          element);
                                },
                                child: Icon(
                                  Icons.close,
                                  size: 15,
                                ),
                              ),
                            ],
                          ),
                        ),
                      )
                      .toList(),
                );
              }),
              SizedBox(
                height: 5,
              ),
              // Job Category Dropdown
              Obx(() {
                if (controller.selectedSpecializationWorkingExp.length > 2) {
                  return Container();
                }
                return getDropDownSearch(
                  configService.getSpecializationList(),
                  label: '+ Add category (max. 3 categories)',
                  hintText: '+ Add category (max. 3 categories)',
                  selectedItem: '+ Add category (max. 3 categories)',
                  onChange: (v) {
                    controller.updateSelectedSpecializationWorkingExp(v);
                  },
                );
              }),
            ],
          )),
          SizedBox(height: 10.0),
          Container(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                controller.selectedCompany.value.name == null
                    ? getInputWidget(
                        label: 'Company Name',
                        hintText: 'eg. Google',
                        initialValue: controller.selectedCompany.value.name,
                        onChange: (v) {
                          controller.updateSeletedCompanyName(v);
                          controller.searchCompany(v);
                        })
                    : Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Company Name',
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
                                borderRadius: BorderRadius.circular(10),
                                border: Border.all(color: searchBorder)),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(controller.selectedCompany.value.name
                                    .toString()),
                                InkWell(
                                  onTap: () {
                                    controller.removeSeletedCompany();
                                  },
                                  child: Icon(
                                    Icons.close,
                                    size: 15,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                SizedBox(
                  height: 10,
                ),
                Obx(() {
                  if (controller.companyLoading.value) {
                    return SpinKitWave(
                      color: primaryColor,
                      size: 15,
                    );
                  }
                  if (controller.companyFilterModel.value.data != null) {
                    return Wrap(
                      children: controller
                          .companyFilterModel.value.data!.companies!
                          .map((e) => Container(
                                margin: EdgeInsets.only(right: 10, bottom: 5),
                                padding: EdgeInsets.all(5),
                                decoration: BoxDecoration(
                                    color: controller.selectedCompany.value == e
                                        ? primaryColor
                                        : Colors.white,
                                    borderRadius: BorderRadius.circular(10),
                                    border: Border.all(color: searchBorder)),
                                child: InkWell(
                                    onTap: () {
                                      controller.updateSeletedCompany(e);
                                    },
                                    child: Text(
                                      e!.name!.toString(),
                                      style: TextStyle(
                                          fontSize: 12,
                                          color: controller
                                                      .selectedCompany.value ==
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
          SizedBox(height: 10.0),
          getDropDownSearch(
            configService.getLocationList(),
            label: 'Current Location ',
            hintText: 'Select Location ',
            selectedItem: controller.locationWorkingExp.value,
            onChange: (v) {
              controller.setLocationWorkingExp(v);
            },
          ),
          SizedBox(height: 10.0),
          getDropDownSearch(
            configService.getIndustryList(),
            label: 'Industry ',
            hintText: 'Select Industry ',
            selectedItem: controller.industry.value,
            onChange: (v) {
              controller.setIndustry(v);
            },
          ),
          SizedBox(height: 10.0),
          getNumberInputWidget(
            label: 'Salary',
            hintText: '1,000',
            initialValue: controller.salaryWorkingExp.value,
            onChange: (v) {
              controller.setSalaryWorkingExp(v);
            },
          ),
          SizedBox(height: 10.0),
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
                    onTap: () => _selectStartDate(context),
                    child: Container(
                        width: double.infinity,
                        padding: EdgeInsets.symmetric(
                            vertical: 15.0, horizontal: 10.0),
                        decoration: BoxDecoration(
                          border: Border.all(color: socialButtonTextColor),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Obx(() {
                          if (controller.startDate.value == '') {
                            selectedStartDate = DateTime.now();
                            return Text(
                                "${selectedStartDate!.toLocal()}".split(' ')[0],
                                style: inputText);
                          }
                          return Text(controller.startDate.value,
                              style: inputText);
                        }))),
              ],
            ),
          ),
          SizedBox(height: 10.0),
          Obx(() {
            if (controller.checkboxWorkingExp.value == true) {
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
                      onTap: () => _selectEndDate(context),
                      child: Container(
                          width: double.infinity,
                          padding: EdgeInsets.symmetric(
                              vertical: 15.0, horizontal: 10.0),
                          decoration: BoxDecoration(
                            border: Border.all(color: socialButtonTextColor),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Obx(() {
                            if (controller.endDate.value == '') {
                              selectedEndDate = DateTime.now();

                              return Text(
                                  "${selectedEndDate!.toLocal()}".split(' ')[0],
                                  style: inputText);
                            }
                            return Text(controller.endDate.toString(),
                                style: inputText);
                          }))),
                ],
              ),
            );
          }),
          SizedBox(height: 10.0),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CheckBox(
                  isActive: controller.checkboxWorkingExp.value,
                  onChange: () {
                    setState(() {
                      controller.setCheckboxWorkingExp(
                          !controller.checkboxWorkingExp.value);
                    });
                  }),
              SizedBox(
                width: 10,
              ),
              Text('Present'),
            ],
          ),
        ],
      ),
    );
  }

  Widget qualification(context, ApplyController controller) {
    List<String> educationLevel = [
      'Diploma',
      'Bachelor',
      'Master',
      'Doctor',
    ];

    ConfigService configService = Get.find();
    DateTime? selectedStartDateEdu;
    DateTime? selectedEndDateEdu;
    Future<void> _selectStartDateEdu(BuildContext context) async {
      if (controller.startDateEdu.value != '') {
        selectedStartDateEdu = new DateFormat("yyyy-MM-dd")
            .parse(controller.startDateEdu.value.toString());
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
      controller.setStartDateEdu(date);
    }

    Future<void> _selectEndDateEdu(BuildContext context) async {
      if (controller.endDateEdu.value != '') {
        selectedEndDateEdu = new DateFormat("yyyy-MM-dd")
            .parse(controller.endDateEdu.value.toString());
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
      controller.setEndDateEdu(date);
    }

    return Container(
      padding: EdgeInsets.only(
        top: 25,
        left: 20,
        right: 20,
        bottom: 0,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                controller.selectedSchool.value.name == null
                    ? getInputWidget(
                        label: 'School Name',
                        hintText: 'eg. University',
                        initialValue: controller.selectedSchool.value.name,
                        onChange: (v) {
                          controller.updateSeletedSchoolName(v);
                          controller.searchSchool(v);
                        })
                    : Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
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
                                borderRadius: BorderRadius.circular(10),
                                border: Border.all(color: searchBorder)),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(controller.selectedSchool.value.name
                                    .toString()),
                                InkWell(
                                  onTap: () {
                                    controller.removeSeletedSchool();
                                  },
                                  child: Icon(
                                    Icons.close,
                                    size: 15,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                SizedBox(
                  height: 10,
                ),
                Obx(() {
                  if (controller.schoolLoading.value) {
                    return SpinKitWave(
                      color: primaryColor,
                      size: 15,
                    );
                  }
                  if (controller.schoolFilterModel.value.data != null) {
                    return Wrap(
                      children: controller
                          .schoolFilterModel.value.data!.schools!
                          .map((e) => Container(
                                margin: EdgeInsets.only(right: 10, bottom: 5),
                                padding: EdgeInsets.all(5),
                                decoration: BoxDecoration(
                                    color: controller.selectedSchool.value == e
                                        ? primaryColor
                                        : Colors.white,
                                    borderRadius: BorderRadius.circular(10),
                                    border: Border.all(color: searchBorder)),
                                child: InkWell(
                                    onTap: () {
                                      controller.updateSeletedSchool(e);
                                    },
                                    child: Text(
                                      e!.name!.toString(),
                                      style: TextStyle(
                                          fontSize: 12,
                                          color:
                                              controller.selectedSchool.value ==
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
          SizedBox(height: 10.0),
          getInputWidget(
            label: 'Field of Study',
            hintText: 'eg. Accounting',
            initialValue: controller.studyField.value,
            onChange: (v) {
              controller.setStudyFeild(v);
            },
          ),
          SizedBox(height: 10.0),
          getDropDownSearch(
            educationLevel,
            label: 'Education Level',
            hintText: "Select Education Level",
            onChange: (v) {
              controller.setEducation(v);
            },
            selectedItem: controller.education.value,
          ),
          SizedBox(height: 10.0),
          getDropDownSearch(
            configService.getLocationList(),
            label: 'Location ',
            hintText: 'Select Location ',
            selectedItem: controller.locationEdu.value,
            onChange: (v) {
              controller.setLocationEdu(v);
            },
          ),
          SizedBox(height: 10.0),
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
                          border: Border.all(color: socialButtonTextColor),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Obx(() {
                          if (controller.startDateEdu.value == '') {
                            selectedStartDateEdu = DateTime.now();
                            return Text(
                                "${selectedStartDateEdu!.toLocal()}"
                                    .split(' ')[0],
                                style: inputText);
                          }
                          return Text(controller.startDateEdu.value,
                              style: inputText);
                        }))),
              ],
            ),
          ),
          SizedBox(height: 10.0),
          Obx(() {
            if (controller.checkboxEdu.value == true) {
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
                            border: Border.all(color: socialButtonTextColor),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Obx(() {
                            if (controller.endDateEdu.value == '') {
                              selectedEndDateEdu = DateTime.now();

                              return Text(
                                  "${selectedEndDateEdu!.toLocal()}"
                                      .split(' ')[0],
                                  style: inputText);
                            }
                            return Text(controller.endDateEdu.toString(),
                                style: inputText);
                          }))),
                ],
              ),
            );
          }),
          SizedBox(height: 10.0),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CheckBox(
                  isActive: controller.checkboxEdu.value,
                  onChange: () {
                    setState(() {
                      controller.setCheckboxEdu(!controller.checkboxEdu.value);
                    });
                  }),
              SizedBox(
                width: 10,
              ),
              Text('Present'),
            ],
          ),
        ],
      ),
    );
  }
}
