import 'dart:async';

import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/constant.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/RegisterFlowController.dart';
import 'package:bossjobapp/Models/ConfigData.dart';
import 'package:bossjobapp/Models/LocationModel.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:bossjobapp/Widgets/Button.dart';
import 'package:bossjobapp/Widgets/Checkbox.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/RangeBar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';
import 'package:get/instance_manager.dart';

class RegisterFlow extends StatelessWidget {
  const RegisterFlow({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    RegisterFlowController registerFlowController =
        Get.put(RegisterFlowController());
    return WillPopScope(
      onWillPop: () {
        // to avoid return to auth page.
        return Future.delayed(Duration(seconds: 1), () {
          return false;
        });
      },
      child: Obx(() => Scaffold(
            backgroundColor: background,
            appBar: HeaderBar(
              isShowOnBack: registerFlowController.flowIndex.value == 1,
              isShowSkip: true,
              onBackClick: () {
                registerFlowController.setFlowIndex(0);
              },
            ),
            body: Stack(
              children: [
                Container(
                  height: h(context, 1),
                  padding: EdgeInsets.all(defaultPadding),
                  color: background,
                  child: SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                          height: 10,
                        ),
                        getJobCategory(context, registerFlowController),
                        SizedBox(
                          height: 20,
                        ),
                        getJobSection(context, registerFlowController),
                        SizedBox(
                          height: 20,
                        ),
                        getJobType(context, registerFlowController),
                        SizedBox(
                          height: 20,
                        ),
                        getSalary(context, registerFlowController),
                        SizedBox(
                          height: 20,
                        ),
                        getLocation(context, registerFlowController),
                        SizedBox(
                          height: 20,
                        ),
                        getIndustry(context, registerFlowController),
                        SizedBox(
                          height: h(context, 0.1),
                        ),
                      ],
                    ),
                  ),
                ),
                Positioned(
                    bottom: 10,
                    left: 10,
                    right: 10,
                    child: getSubmitButton(
                        label: 'Continue',
                        isActive: registerFlowController.isValidToSubmit.value,
                        onClick: () {
                          registerFlowController.submitPref();
                        })),
              ],
            ),
          )),
    );
  }

  Widget getJobCategory(
      context, RegisterFlowController registerFlowController) {
    ConfigService configService = Get.find();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Job Category',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
        ),
        Divider(
          height: 25,
          color: messagesDivider,
        ),
        // Selected Job Category
        Obx(() {
          if (registerFlowController.selectedJobCate.length == 0) Container();
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: registerFlowController.selectedJobCate
                .map(
                  (element) => Container(
                    padding: EdgeInsets.only(bottom: 5),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          element.value.toString(),
                          style: TextStyle(color: inputLabelColor),
                        ),
                        InkWell(
                          onTap: () {
                            registerFlowController
                                .removeSelectedJobCate(element);
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
          if (registerFlowController.selectedJobCate.length > 2) {
            return Container();
          }
          if (configService.getConfig.data == null) {
            return Container();
          }
          return InkWell(
            onTap: () {},
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: defaultPadding / 2),
              width: double.infinity,
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: searchBorder)),
              child: DropdownButton<ConfigDataDataInputsJobCategoryLists>(
                underline: Container(),
                hint: Container(
                  width: w(context, 0.8),
                  child: Text('+ Add category (max. 3 categories)',
                      style: TextStyle(color: inputInsideLabel)),
                ),
                elevation: 16,
                style: const TextStyle(color: primaryColor),
                onChanged: (ConfigDataDataInputsJobCategoryLists? newValue) {
                  registerFlowController.updateSelectedJobCate(newValue);
                },
                items: configService.getConfig.data!.inputs!.jobCategoryLists!
                    .map((e) =>
                        DropdownMenuItem<ConfigDataDataInputsJobCategoryLists>(
                          child: Text(e!.value.toString()),
                          value: e,
                        ))
                    .toList(),
              ),
            ),
          );
        }),
      ],
    );
  }

  Widget getJobSection(context, RegisterFlowController registerFlowController) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Job',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
        ),
        Divider(
          height: 25,
          color: messagesDivider,
        ),
        registerFlowController.selectedJob.value.jobTitle == null
            ? getInputWidget(
                label: 'Search job title',
                hint: 'Select only one option',
                onChange: (v) {
                  registerFlowController.searchJob(v);
                })
            : Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Search job title',
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
                        Text(registerFlowController.selectedJob.value.jobTitle
                            .toString()),
                        InkWell(
                          onTap: () {
                            registerFlowController.removeSeletedJob();
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
          if (registerFlowController.jobLoading.value) {
            return SpinKitWave(
              color: primaryColor,
              size: 15,
            );
          }
          if (registerFlowController.jobFilterModel.value.data != null) {
            return Wrap(
              children: registerFlowController.jobFilterModel.value.data!.jobs!
                  .map((e) => Container(
                        margin: EdgeInsets.only(right: 10, bottom: 5),
                        padding: EdgeInsets.all(5),
                        decoration: BoxDecoration(
                            color: registerFlowController.selectedJob.value == e
                                ? primaryColor
                                : Colors.white,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: searchBorder)),
                        child: InkWell(
                            onTap: () {
                              registerFlowController.updateSeletedJob(e);
                            },
                            child: Text(
                              e!.jobTitle!.toString(),
                              style: TextStyle(
                                  fontSize: 12,
                                  color: registerFlowController
                                              .selectedJob.value ==
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
    );
  }

  Widget getIndustry(context, RegisterFlowController registerFlowController) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Industry',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
        ),
        Divider(
          height: 25,
          color: messagesDivider,
        ),
        registerFlowController.selectedIndustry.value.value == null
            ? getInputWidget(
                label: 'Search industry',
                hint: 'Select only one option',
                onChange: (v) {
                  registerFlowController.searchIndustry(v);
                })
            : Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Search industry',
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
                        Text(registerFlowController.selectedIndustry.value.value
                            .toString()),
                        InkWell(
                          onTap: () {
                            registerFlowController.removeSeletedIndustry();
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
          if (registerFlowController.industryLoading.value) {
            return SpinKitWave(
              color: primaryColor,
              size: 15,
            );
          }
          if (registerFlowController.industryFilterModel.value.data != null) {
            return Wrap(
              children: registerFlowController
                  .industryFilterModel.value.data!.industry!
                  .map((e) => Container(
                        margin: EdgeInsets.only(right: 10, bottom: 5),
                        padding: EdgeInsets.all(5),
                        decoration: BoxDecoration(
                            color:
                                registerFlowController.selectedIndustry.value ==
                                        e
                                    ? primaryColor
                                    : Colors.white,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: searchBorder)),
                        child: InkWell(
                            onTap: () {
                              registerFlowController.updateSeletedIndustry(e);
                            },
                            child: Text(
                              e!.value!.toString(),
                              style: TextStyle(
                                  fontSize: 12,
                                  color: registerFlowController
                                              .selectedIndustry.value ==
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
    );
  }

  Widget getJobType(context, RegisterFlowController registerFlowController) {
    ConfigService configService = Get.find();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Job Type',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
        ),
        Divider(
          height: 25,
          color: messagesDivider,
        ),
        if (configService.getConfig.data != null)
          for (var i = 0;
              i < configService.getConfig.data!.inputs!.jobTypes!.length;
              i++)
            Container(
              padding: EdgeInsets.only(bottom: 10),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(configService.getConfig.data!.inputs!.jobTypes![i]!.value
                      .toString()),
                  CheckBox(
                      isActive: configService
                              .getConfig.data!.inputs!.jobTypes![i]!.key
                              .toString() ==
                          registerFlowController.selectedJobType.value,
                      onChange: () {
                        registerFlowController.updateSelectedJobType(
                            configService
                                .getConfig.data!.inputs!.jobTypes![i]!.key
                                .toString());
                      }),
                ],
              ),
            )
      ],
    );
  }

  Widget getLocation(context, RegisterFlowController registerFlowController) {
    ConfigService configService = Get.find();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Location',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
        ),
        Divider(
          height: 25,
          color: messagesDivider,
        ),
        // Job Category Dropdown
        Obx(() {
          if (configService.getLocation.data == null) {
            return Container();
          }
          return InkWell(
            onTap: () {},
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: defaultPadding / 2),
              width: double.infinity,
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: searchBorder)),
              child: DropdownButton<LocationModelDataLocations>(
                underline: Container(),
                hint: Container(
                  width: w(context, 0.8),
                  child: Text(
                      registerFlowController.selectedLocation.value.value ??
                          'City',
                      style: TextStyle(color: inputInsideLabel)),
                ),
                value:
                    registerFlowController.selectedLocation.value.value == null
                        ? configService.getLocation.data!.locations![0]
                        : registerFlowController.selectedLocation.value,
                elevation: 16,
                style: const TextStyle(color: primaryColor),
                onChanged: (LocationModelDataLocations? newValue) {
                  registerFlowController.updateSelectedLocation(newValue);
                },
                items: configService.getLocation.data!.locations!
                    .map((e) => DropdownMenuItem<LocationModelDataLocations>(
                          child: Text(e!.value.toString()),
                          value: e,
                        ))
                    .toList(),
              ),
            ),
          );
        }),
      ],
    );
  }

  Widget getSalary(context, RegisterFlowController registerFlowController) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Expected Salary',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
        ),
        Divider(
          height: 25,
          color: messagesDivider,
        ),
        Container(
          padding: EdgeInsets.only(top: 30.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Expected Salary',
                style: styleJobTitle,
              ),
              SizedBox(height: 10.0),
              RangeBar(
                labelLeft: 'From',
                labelRight: 'To',
                onChanged: (v) {
                  registerFlowController.updateSalaryrange(v);
                },
                min: 10000,
                max: 200000,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget getInputWidget(
      {label, onChange, initialValue = '', obscure = false, hint = ''}) {
    return Container(
      child: Column(
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
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: searchBorder)),
            child: TextFormField(
              obscureText: obscure,
              initialValue: initialValue,
              decoration: new InputDecoration(
                  hintText: hint,
                  hintStyle: TextStyle(color: inputInsideLabel),
                  isDense: true,
                  fillColor: Colors.white,
                  focusColor: Colors.white,
                  border: OutlineInputBorder(
                      borderSide: BorderSide.none,
                      borderRadius: BorderRadius.circular(10))),
              onChanged: onChange,
              style: inputText,
            ),
          ),
        ],
      ),
    );
  }

  Widget getSubmitButton({label, onClick, isActive = false}) {
    return Container(
      child: Button(
          backgroundColor: isActive ? primaryColor : lightGrey,
          textColor: Colors.white,
          label: label,
          onPressed: onClick),
    );
  }
}
