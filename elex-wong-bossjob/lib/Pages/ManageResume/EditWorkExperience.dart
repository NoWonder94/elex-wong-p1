import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/constant.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/EditWorkExpController.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:bossjobapp/Widgets/Checkbox.dart';
import 'package:bossjobapp/Widgets/FooterSubmitButton.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/ManageResume/DropDownSearch.dart';
import 'package:bossjobapp/Widgets/ManageResume/FormInput.dart';
import 'package:bossjobapp/Widgets/ManageResume/FormNumberInput.dart';
import 'package:bossjobapp/Widgets/ManageResume/MultilineInput.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

class EditWorkExperience extends StatefulWidget {
  const EditWorkExperience({Key? key}) : super(key: key);

  @override
  State<EditWorkExperience> createState() => _EditWorkExperienceState();
}

class _EditWorkExperienceState extends State<EditWorkExperience> {
  EditWorkExpController editWorkExpController =
      Get.put(EditWorkExpController());
  ConfigService configService = Get.find();
  AppController appController = Get.put(AppController());

  @override
  void initState() {
    super.initState();
    /* pass id to controller */
    if (Get.arguments != null) {
      editWorkExpController.getUserWorkExp(Get.arguments['workId']);
    }
    /* pass id to controller */
  }

  @override
  Widget build(BuildContext context) {
    DateTime? selectedStartDate;
    DateTime? selectedEndDate;

    Future<void> _selectStartDate(BuildContext context) async {
      if (editWorkExpController.workingInfo.value.workingPeriodFrom != null) {
        selectedStartDate = new DateFormat("yyyy-MM-dd").parse(
            editWorkExpController.workingInfo.value.workingPeriodFrom
                .toString());
      } else {
        selectedStartDate = DateTime.now();
      }

      final DateTime? picked = await showDatePicker(
          context: context,
          initialDate: DateTime.now(),
          firstDate: DateTime(1950, 1),
          lastDate: DateTime.now());
      if (picked != null && picked != selectedStartDate)
        setState(() {
          selectedStartDate = picked;
        });

      String date = DateFormat("yyyy-MM-dd").format(selectedStartDate!);
      editWorkExpController.setStartDate(date);
    }

    Future<void> _selectEndDate(BuildContext context) async {
      if (editWorkExpController.workingInfo.value.workingPeriodTo != null) {
        selectedEndDate = new DateFormat("yyyy-MM-dd").parse(
            editWorkExpController.workingInfo.value.workingPeriodTo.toString());
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
      editWorkExpController.setEndDate(date);
    }

    return Scaffold(
      appBar: HeaderBar(
        isShowOnBack: true,
      ),
      body: Stack(
        children: [
          Obx(
            () => editWorkExpController.isApiLoading.value
                ? Center(
                    child: CircularProgressIndicator(),
                  )
                : SingleChildScrollView(
                    child: Container(
                      padding: EdgeInsets.only(
                          top: 25.0, left: 20.0, right: 20.0, bottom: 130.0),
                      child: Column(
                        children: [
                          /* job title */
                          Container(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Obx(
                                  () => editWorkExpController
                                              .selectedJob.value.name ==
                                          null
                                      ? getInputWidget(
                                          label: 'Job Title',
                                          hintText: 'eg. Accountant',
                                          initialValue: editWorkExpController
                                                  .selectedJob.value.name ??
                                              '',
                                          onChange: (val) {
                                            editWorkExpController
                                                .updateSeletedJobTitle(val);
                                            editWorkExpController
                                                .searchJob(val);
                                          })
                                      : Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
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
                                                  horizontal:
                                                      defaultPadding / 2,
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
                                                    MainAxisAlignment
                                                        .spaceBetween,
                                                children: [
                                                  Text(editWorkExpController
                                                      .selectedJob.value.name
                                                      .toString()),
                                                  InkWell(
                                                    onTap: () {
                                                      editWorkExpController
                                                          .removeSeletedJob();
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
                                ),
                                SizedBox(
                                  height: 10,
                                ),
                                Obx(() {
                                  if (editWorkExpController.jobLoading.value) {
                                    return SpinKitWave(
                                      color: primaryColor,
                                      size: 15,
                                    );
                                  }
                                  if (editWorkExpController
                                          .jobTitleFilterModel.value.data !=
                                      null) {
                                    return Wrap(
                                      children: editWorkExpController
                                          .jobTitleFilterModel.value.data!.jobs!
                                          .map((e) => Container(
                                                margin: EdgeInsets.only(
                                                    right: 10, bottom: 5),
                                                padding: EdgeInsets.all(5),
                                                decoration: BoxDecoration(
                                                    color: editWorkExpController
                                                                .selectedJob
                                                                .value ==
                                                            e
                                                        ? primaryColor
                                                        : Colors.white,
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            10),
                                                    border: Border.all(
                                                        color: searchBorder)),
                                                child: InkWell(
                                                    onTap: () {
                                                      editWorkExpController
                                                          .updateSeletedJob(e);
                                                    },
                                                    child: Text(
                                                      e!.name!.toString(),
                                                      style: TextStyle(
                                                          fontSize: 12,
                                                          color: editWorkExpController
                                                                      .selectedJob
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

                          /* job title */
                          SizedBox(height: 15.0),
                          /* Specialization */
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
                                if (editWorkExpController
                                        .selectedSpecializationWorkingExp
                                        .length ==
                                    0) {
                                  Container();
                                }

                                return Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: editWorkExpController
                                      .selectedSpecializationWorkingExp
                                      .map(
                                        (element) => Container(
                                          padding: EdgeInsets.only(bottom: 5),
                                          child: Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: [
                                              Text(
                                                element.toString(),
                                                style: inputText,
                                              ),
                                              InkWell(
                                                onTap: () {
                                                  editWorkExpController
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
                                if (editWorkExpController
                                        .selectedSpecializationWorkingExp
                                        .length >
                                    2) {
                                  return Container();
                                }
                                return getDropDownSearch(
                                  configService.getSpecializationList(),
                                  label: '+ Add category (max. 3 categories)',
                                  hintText:
                                      '+ Add category (max. 3 categories)',
                                  selectedItem:
                                      '+ Add category (max. 3 categories)',
                                  onChange: (v) {
                                    editWorkExpController
                                        .updateSelectedSpecializationWorkingExp(
                                            v);
                                  },
                                );
                              }),
                            ],
                          )),
                          /* Specialization */
                          SizedBox(height: 15.0),
                          /* company name */
                          Container(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                editWorkExpController
                                            .selectedCompany.value.name ==
                                        null
                                    ? getInputWidget(
                                        label: 'Company Name',
                                        hintText: 'eg. Google',
                                        initialValue: '',
                                        onChange: (val) {
                                          editWorkExpController
                                              .updateSeletedCompanyName(val);
                                          editWorkExpController
                                              .searchCompany(val);
                                        })
                                    : Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
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
                                                borderRadius:
                                                    BorderRadius.circular(10),
                                                border: Border.all(
                                                    color: searchBorder)),
                                            child: Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment
                                                      .spaceBetween,
                                              children: [
                                                Expanded(
                                                  flex: 9,
                                                  child: Text(
                                                      editWorkExpController
                                                          .selectedCompany
                                                          .value
                                                          .name
                                                          .toString()),
                                                ),
                                                Expanded(
                                                  flex: 1,
                                                  child: InkWell(
                                                    onTap: () {
                                                      editWorkExpController
                                                          .removeSeletedCompany();
                                                    },
                                                    child: Icon(Icons.close,
                                                        size: 15),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ],
                                      ),
                                SizedBox(height: 10),
                                Obx(() {
                                  if (editWorkExpController
                                      .companyLoading.value) {
                                    return SpinKitWave(
                                        color: primaryColor, size: 15);
                                  }
                                  if (editWorkExpController
                                          .companyFilterModel.value.data !=
                                      null) {
                                    return Wrap(
                                      children: editWorkExpController
                                          .companyFilterModel
                                          .value
                                          .data!
                                          .companies!
                                          .map(
                                            (e) => Container(
                                              margin: EdgeInsets.only(
                                                  right: 10, bottom: 5),
                                              padding: EdgeInsets.all(5),
                                              decoration: BoxDecoration(
                                                  color: editWorkExpController
                                                              .selectedCompany
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
                                                  editWorkExpController
                                                      .updateSeletedCompany(e);
                                                },
                                                child: Text(
                                                  e!.name!.toString(),
                                                  style: TextStyle(
                                                      fontSize: 12,
                                                      color: editWorkExpController
                                                                  .selectedCompany
                                                                  .value ==
                                                              e
                                                          ? Colors.white
                                                          : Colors.black),
                                                ),
                                              ),
                                            ),
                                          )
                                          .toList(),
                                    );
                                  }
                                  return Container();
                                })
                              ],
                            ),
                          ),

                          /* company name */
                          SizedBox(height: 15.0),
                          /* location */
                          getDropDownSearch(
                            configService.getLocationList(),
                            label: 'Location ',
                            hintText: 'Select Location ',
                            selectedItem:
                                editWorkExpController.locationWorkingExp,
                            onChange: (val) {
                              editWorkExpController.setLocationWorkingExp(val);
                            },
                          ),
                          /* location */
                          SizedBox(height: 15.0),
                          /* industry */
                          getDropDownSearch(
                            configService.getIndustryList(),
                            label: 'Industry ',
                            hintText: 'Select Industry ',
                            selectedItem: editWorkExpController.industry,
                            onChange: (val) {
                              editWorkExpController.setIndustry(val);
                            },
                          ),
                          /* industry */
                          SizedBox(height: 15.0),
                          /* salary */
                          getNumberInputWidget(
                            label: 'Salary',
                            hintText: '₱ 1000',
                            initialValue: editWorkExpController.salaryWorkingExp
                                .toString(),
                            onChange: (val) {
                              editWorkExpController.setSalaryWorkingExp(val);
                            },
                          ),
                          /* salary */
                          SizedBox(height: 15.0),
                          /* work period */
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
                                      border: Border.all(
                                          color: socialButtonTextColor),
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    child: Obx(
                                      () {
                                        if (editWorkExpController
                                                .startDate.value ==
                                            '') {
                                          selectedStartDate = DateTime.now();
                                          return Text(
                                              "${selectedStartDate!.toLocal()}"
                                                  .split(' ')[0],
                                              style: inputText);
                                        }
                                        return Text(
                                            editWorkExpController
                                                .startDate.value,
                                            style: inputText);
                                      },
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SizedBox(height: 15.0),
                          Obx(() {
                            if (editWorkExpController
                                    .checkboxWorkingExp.value ==
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
                                    onTap: () => _selectEndDate(context),
                                    child: Container(
                                      width: double.infinity,
                                      padding: EdgeInsets.symmetric(
                                          vertical: 15.0, horizontal: 10.0),
                                      decoration: BoxDecoration(
                                        border: Border.all(
                                            color: socialButtonTextColor),
                                        borderRadius: BorderRadius.circular(10),
                                      ),
                                      child: Obx(
                                        () {
                                          if (editWorkExpController
                                                  .endDate.value ==
                                              '') {
                                            selectedEndDate = DateTime.now();

                                            return Text(
                                                "${selectedEndDate!.toLocal()}"
                                                    .split(' ')[0],
                                                style: inputText);
                                          }
                                          return Text(
                                              editWorkExpController.endDate
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
                                  isActive: editWorkExpController
                                      .checkboxWorkingExp.value,
                                  onChange: () {
                                    setState(() {
                                      editWorkExpController
                                          .setCheckboxWorkingExp(
                                              !editWorkExpController
                                                  .checkboxWorkingExp.value);
                                    });
                                  }),
                              SizedBox(
                                width: 10,
                              ),
                              Text('Present'),
                            ],
                          ),
                          /* work period */

                          /* description */
                          Obx(
                            () => getMultilineInput(
                              label: 'Description',
                              hintText: 'Short description about you…',
                              maxLines: 8,
                              onchange: (v) {
                                editWorkExpController.setDescription(v);
                              },
                              initialValue: editWorkExpController
                                          .workingInfo.value.description !=
                                      null
                                  ? editWorkExpController
                                      .workingInfo.value.description
                                      .toString()
                                  : '',
                            ),
                          ),
                          /* description */
                        ],
                      ),
                    ),
                  ),
          ),

          /* save button */
          Obx(() {
            if (editWorkExpController.isApiLoading.value == true) {
              return Container();
            }

            return Align(
              alignment: Alignment.bottomCenter,
              child: FooterSubmitButton(
                label: 'Update',
                onPressed: () {
                  if (Get.arguments != null) {
                    editWorkExpController
                        .updateWorkingExp(Get.arguments['workId']);
                  } else {
                    editWorkExpController.submitWorkingExp();
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
