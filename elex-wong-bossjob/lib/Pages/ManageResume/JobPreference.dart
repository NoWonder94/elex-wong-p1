import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/constant.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/JobPreferenceController.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:bossjobapp/Widgets/Checkbox.dart';
import 'package:bossjobapp/Widgets/FooterSubmitButton.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/ManageResume/DropDownSearch.dart';
import 'package:bossjobapp/Widgets/ManageResume/FormInput.dart';
import 'package:bossjobapp/Widgets/RangeBar.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';

class JobPreference extends StatelessWidget {
  const JobPreference({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ConfigService configService = Get.find();
    AppController appController = Get.find();
    JobPreferenceController jobPreferenceController =
        Get.put(JobPreferenceController());

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
                    top: 25.0, left: 20.0, right: 20.0, bottom: 130.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                        child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Job Category',
                          style: inputLabel,
                        ),
                        SizedBox(height: 5),
                        Obx(() {
                          if (jobPreferenceController
                                  .selectedSpecialization.length ==
                              0) {
                            Container();
                          }

                          return Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children:
                                jobPreferenceController.selectedSpecialization
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
                                                jobPreferenceController
                                                    .removeSelectedSpecialization(
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
                          if (jobPreferenceController
                                  .selectedSpecialization.length >
                              2) {
                            return Container();
                          }

                          return getDropDownSearch(
                            configService.getSpecializationList(),
                            label: '+ Add category (max. 3 categories)',
                            hintText: '+ Add category (max. 3 categories)',
                            selectedItem: '+ Add category (max. 3 categories)',
                            onChange: (v) {
                              jobPreferenceController
                                  .updateSelectedSpecialization(v);
                            },
                          );
                        }),
                      ],
                    )),
                    SizedBox(height: 15.0),
                    Container(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          jobPreferenceController.selectedJob.value.jobTitle ==
                                  null
                              ? getInputWidget(
                                  label: 'Job',
                                  hintText: 'eg. Accountant',
                                  initialValue: jobPreferenceController
                                      .selectedJob.value.jobTitle,
                                  onChange: (v) {
                                    jobPreferenceController
                                        .updateSeletedJobTitle(v);
                                    jobPreferenceController.searchJob(v);
                                  })
                              : Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Job',
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
                                          border:
                                              Border.all(color: searchBorder)),
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text(jobPreferenceController
                                              .selectedJob.value.jobTitle
                                              .toString()),
                                          InkWell(
                                            onTap: () {
                                              jobPreferenceController
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
                          SizedBox(
                            height: 10,
                          ),
                          Obx(() {
                            if (jobPreferenceController.jobLoading.value) {
                              return SpinKitWave(
                                color: primaryColor,
                                size: 15,
                              );
                            }
                            if (jobPreferenceController
                                    .jobFilterModel.value.data !=
                                null) {
                              return Wrap(
                                children: jobPreferenceController
                                    .jobFilterModel.value.data!.jobs!
                                    .map((e) => Container(
                                          margin: EdgeInsets.only(
                                              right: 10, bottom: 5),
                                          padding: EdgeInsets.all(5),
                                          decoration: BoxDecoration(
                                              color: jobPreferenceController
                                                          .selectedJob.value ==
                                                      e
                                                  ? primaryColor
                                                  : Colors.white,
                                              borderRadius:
                                                  BorderRadius.circular(10),
                                              border: Border.all(
                                                  color: searchBorder)),
                                          child: InkWell(
                                              onTap: () {
                                                jobPreferenceController
                                                    .updateSeletedJob(e);
                                              },
                                              child: Text(
                                                e!.jobTitle!.toString(),
                                                style: TextStyle(
                                                    fontSize: 12,
                                                    color:
                                                        jobPreferenceController
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
                    SizedBox(height: 20.0),
                    /* Job Type */
                    Container(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Job Type',
                            style: styleJobTitle,
                          ),
                          Divider(
                            color: Color.fromARGB(255, 187, 187, 187),
                            height: 25.0,
                          ),
                          for (var i = 0;
                              i <
                                  configService
                                      .getConfig.data!.inputs!.jobTypes!.length;
                              i++)
                            Container(
                              padding: EdgeInsets.only(bottom: 10),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(configService.getConfig.data!.inputs!
                                      .jobTypes![i]!.value
                                      .toString()),
                                  CheckBox(
                                      isActive: configService.getConfig.data!
                                              .inputs!.jobTypes![i]!.key
                                              .toString() ==
                                          jobPreferenceController
                                              .selectedJobType.value,
                                      onChange: () {
                                        jobPreferenceController
                                            .updateSelectedJobType(configService
                                                .getConfig
                                                .data!
                                                .inputs!
                                                .jobTypes![i]!
                                                .key
                                                .toString());
                                      }),
                                ],
                              ),
                            ),
                        ],
                      ),
                    ),
                    Divider(color: Color.fromARGB(255, 187, 187, 187)),
                    SizedBox(height: 20.0),
                    /* Expected Salary */
                    Container(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Expected Salary',
                            style: styleJobTitle,
                          ),
                          SizedBox(height: 10.0),
                          RangeBar(
                            defaultMin: appController.userInfo.value.data!
                                        .latestPreference!.salaryRangeFrom !=
                                    null
                                ? appController.userInfo.value.data!
                                    .latestPreference!.salaryRangeFrom!
                                    .toDouble()
                                : null,
                            defaultMax: appController.userInfo.value.data!
                                        .latestPreference!.salaryRangeTo !=
                                    null
                                ? appController.userInfo.value.data!
                                    .latestPreference!.salaryRangeTo!
                                    .toDouble()
                                : null,
                            labelLeft: 'From',
                            labelRight: 'To',
                            onChanged: (v) {
                              jobPreferenceController.updateSalaryRange(v);
                            },
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 20.0),
                    Divider(color: Color.fromARGB(255, 187, 187, 187)),
                    SizedBox(height: 15.0),
                    getDropDownSearch(
                      configService.getLocationList(),
                      label: 'Prefer Location ',
                      hintText: 'Select Location ',
                      selectedItem:
                          appController.userInfo.value.data!.latestPreference !=
                                  null
                              ? appController.userInfo.value.data!
                                  .latestPreference!.location
                              : 'Select Location',
                      onChange: (v) {
                        jobPreferenceController.setLocation(v);
                      },
                    ),
                    SizedBox(height: 15.0),
                    getDropDownSearch(
                      configService.getIndustryList(),
                      label: 'Industry ',
                      hintText: 'Select Industry ',
                      selectedItem:
                          appController.userInfo.value.data!.latestPreference !=
                                  null
                              ? appController.userInfo.value.data!
                                  .latestPreference!.industry
                              : 'Select Industry',
                      onChange: (v) {
                        jobPreferenceController.setIndustry(v);
                      },
                    ),
                  ],
                ),
              ),
            );
          }),
          /* save button */

          Align(
            alignment: Alignment.bottomCenter,
            child: FooterSubmitButton(
              label: 'Update',
              onPressed: () {
                jobPreferenceController.updatePreference();
              },
            ),
          ),
        ],
      ),
    );
  }
}
