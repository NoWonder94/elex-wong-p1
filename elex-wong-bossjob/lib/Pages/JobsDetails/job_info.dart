import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/common.dart';
import 'package:bossjobapp/Controllers/JobDetails/JobInfomationController.dart';
import 'package:bossjobapp/Models/JobInfoModel.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Services/ApiService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:bossjobapp/Widgets/BorderText.dart';
import 'package:bossjobapp/Widgets/Button.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/Job.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:get/get.dart';

class JobInfomation extends StatefulWidget {
  const JobInfomation({Key? key}) : super(key: key);

  @override
  _JobInfomationState createState() => _JobInfomationState();
}

class _JobInfomationState extends State<JobInfomation> {
  ApiService _apiService = Get.find();
  bool isRoute = false;
  int? jobId;
  String? title;
  String? price;
  List? jobSkills;
  String? companyName;
  String? location;
  String? graduate;
  String? time;
  String? year;
  String? logo;

  Future getJobDetail(id) async {
    var json = await _apiService.getJobInfo(id);
    if (json['success'] == false) {
      showError('error'.tr, json['errors'].toString());
      return;
    }
    var model = JobInfoModel.fromJson(json);
    jobId = model.data!.id;
    title = model.data!.jobTitle;
    price = formatJobPrice(
      model.data!.salaryRangeFrom,
      model.data!.salaryRangeTo,
    );
    jobSkills = formatJobSkills(model.data!.jobSkills);
    companyName = model.data!.companyName;
    location = model.data!.jobLocation;
    graduate = model.data!.degree;
    time = model.data!.jobType;
    year = model.data!.xpLvl;
    logo = model.data!.companyLogo;
    setState(() {});
  }

  getPreviousRoute(r) {
    switch (r) {
      case '/index':
        return 'HomePage';
      case '/companyDetail':
        return 'CompanyDetail';
      case '/searchResult':
        return 'Search';
      default:
        return r;
    }
  }

  @override
  void initState() {
    var route = Get.arguments['route'];
    if (route == 'deeplink') {
      var id = Get.arguments['id'];
      getJobDetail(id);
    } else {
      jobId = Get.arguments['id'];
      title = Get.arguments['title'];
      price = Get.arguments['price'];
      jobSkills = Get.arguments['jobSkills'] ?? const [];
      companyName = Get.arguments['companyName'];
      location = Get.arguments['location'];
      graduate = Get.arguments['graduate'];
      time = Get.arguments['time'];
      year = Get.arguments['year'];
      logo = Get.arguments['logo'];
      AnalyticsService().viewJob(
        getPreviousRoute(Get.previousRoute),
        id: jobId,
        location: location,
        type: time,
      );
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    JobInfomationController jobInfomationController =
        Get.put(JobInfomationController());

    if (jobId == null)
      return Scaffold(
        body: Container(
          child: Center(
            child: CircularProgressIndicator(),
          ),
        ),
      );

    return Scaffold(
      appBar: HeaderBar(
        isShowOnBack: true,
        isShowApply: true,
        jobId: jobId!,
        title: title!,
        price: price!,
        jobSkills: jobSkills!,
        companyName: companyName!,
        location: location!,
        graduate: graduate!,
        time: time!,
        year: year!,
      ),
      body: Container(
        color: background,
        child: Obx(
          () => Container(
            padding: EdgeInsets.only(left: 10, right: 10, bottom: 30),
            child: jobInfomationController.isJobInfoLoading.value == true
                ? Center(
                    child: CircularProgressIndicator(),
                  )
                : SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 25),
                        Job(
                            title: title!,
                            price: price!,
                            jobSkills: jobSkills!,
                            companyName: companyName!,
                            jobs: location!,
                            graduate: graduate!,
                            time: time!,
                            year: year!,
                            logo: logo!),
                        Padding(
                          padding: EdgeInsets.all(20),
                          child: Button(
                            label: 'View Company Profile',
                            backgroundColor: Colors.white,
                            textColor: primaryColor,
                            onPressed: () {
                              Get.toNamed('/companyDetail', arguments: {
                                'companyID': jobInfomationController
                                    .jobInfoModel.value.data!.companyId
                                    .toString(),
                                'title': title,
                                'price': price,
                                'jobSkills': jobSkills,
                                'companyName': companyName,
                                'jobs': location,
                                'graduate': graduate,
                                'time': time,
                                'year': year,
                                'logo': logo
                              });
                            },
                          ),
                        ),
                        //job Description
                        Obx(() {
                          if (jobInfomationController.jobInfoModel.value.data!
                              .jobDescriptionHtml!.isEmpty) {
                            return SizedBox(height: 1);
                          }
                          return Container(
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Job Description",
                                      style: TextStyle(
                                          color: titleText,
                                          fontSize: 14,
                                          fontWeight: FontWeight.w600)),
                                  SizedBox(
                                    height: 15,
                                  ),
                                  Html(
                                    data: jobInfomationController.jobInfoModel
                                        .value.data!.jobDescriptionHtml
                                        .toString(),
                                    //  style: TextStyle(
                                    // color: messagesText,
                                    // fontSize: 14,
                                    // fontWeight: FontWeight.w500)
                                  ),
                                ],
                              ),
                            ),
                          );
                        }),
                        //Requirements
                        Obx(() {
                          if (jobInfomationController.jobInfoModel.value.data!
                              .jobRequirementsHtml!.isEmpty) {
                            return SizedBox(height: 1);
                          }

                          return Container(
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Requirements",
                                      style: TextStyle(
                                          color: titleText,
                                          fontSize: 14,
                                          fontWeight: FontWeight.w600)),
                                  SizedBox(
                                    height: 15,
                                  ),
                                  Html(
                                    data: jobInfomationController.jobInfoModel
                                        .value.data!.jobRequirementsHtml
                                        .toString(),
                                    //  style: TextStyle(
                                    // color: messagesText,
                                    // fontSize: 14,
                                    // fontWeight: FontWeight.w500)
                                  ),
                                ],
                              ),
                            ),
                          );
                        }),

                        //Benefits
                        Obx(() {
                          if (jobInfomationController
                                  .jobInfoModel.value.data!.benefits!.length <
                              1) {
                            return SizedBox(height: 1);
                          }

                          return Container(
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Benefits",
                                      style: TextStyle(
                                          color: titleText,
                                          fontSize: 14,
                                          fontWeight: FontWeight.w600)),
                                  SizedBox(
                                    height: 15,
                                  ),
                                  Wrap(
                                    children: [
                                      for (var i = 0;
                                          i <
                                              jobInfomationController
                                                  .jobInfoModel
                                                  .value
                                                  .data!
                                                  .benefits!
                                                  .length;
                                          i++)
                                        Container(
                                          padding: EdgeInsets.all(8.0),
                                          child: Column(children: [
                                            getBenefitImage(
                                                jobInfomationController
                                                    .jobInfoModel
                                                    .value
                                                    .data!
                                                    .benefits![i]!
                                                    .id),
                                            Text(
                                                jobInfomationController
                                                    .jobInfoModel
                                                    .value
                                                    .data!
                                                    .benefits![i]!
                                                    .name
                                                    .toString(),
                                                style: TextStyle(
                                                    color: titleText,
                                                    fontSize: 12,
                                                    fontWeight:
                                                        FontWeight.w600))
                                          ]),
                                        )
                                    ],
                                  )
                                ],
                              ),
                            ),
                          );
                        }),
                        //Skill / Software
                        Obx(() {
                          if (jobInfomationController
                                  .jobInfoModel.value.data!.jobSkills!.length <
                              1) {
                            return SizedBox(height: 1);
                          }

                          return Container(
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Skill / Software",
                                      style: TextStyle(
                                          color: titleText,
                                          fontSize: 14,
                                          fontWeight: FontWeight.w600)),
                                  SizedBox(
                                    height: 15,
                                  ),
                                  Wrap(
                                    children: [
                                      for (var i = 0;
                                          i <
                                              formatJobSkills(
                                                      jobInfomationController
                                                          .jobInfoModel
                                                          .value
                                                          .data!
                                                          .jobSkills)
                                                  .length;
                                          i++)
                                        BorderText(
                                          label: formatJobSkills(
                                              jobInfomationController
                                                  .jobInfoModel
                                                  .value
                                                  .data!
                                                  .jobSkills)[i],
                                        ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          );
                        }),
                        //Working Location
                        Obx(() {
                          if (jobInfomationController
                                  .jobInfoModel.value.data!.address ==
                              null) {
                            return SizedBox(height: 1);
                          }

                          return Container(
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Working Location",
                                      style: TextStyle(
                                          color: titleText,
                                          fontSize: 14,
                                          fontWeight: FontWeight.w600)),
                                  SizedBox(
                                    height: 15,
                                  ),
                                  Text(
                                      jobInfomationController
                                          .jobInfoModel.value.data!.address
                                          .toString(),
                                      style: TextStyle(
                                          color: messagesText,
                                          fontSize: 14,
                                          fontWeight: FontWeight.w500)),
                                ],
                              ),
                            ),
                          );
                        }),
                        //Specialisation
                        Obx(() {
                          if (jobInfomationController
                                  .jobInfoModel.value.data!.categories!.length <
                              1) {
                            return SizedBox(height: 1);
                          }

                          return Container(
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Specialisation",
                                      style: TextStyle(
                                          color: titleText,
                                          fontSize: 14,
                                          fontWeight: FontWeight.w600)),
                                  SizedBox(
                                    height: 15,
                                  ),
                                  Wrap(
                                    children: [
                                      for (var i = 0;
                                          i <
                                              jobInfomationController
                                                  .jobInfoModel
                                                  .value
                                                  .data!
                                                  .categories!
                                                  .length;
                                          i++)
                                        Wrap(
                                          children: [
                                            Text(
                                                jobInfomationController
                                                    .jobInfoModel
                                                    .value
                                                    .data!
                                                    .categories![i]!
                                                    .value
                                                    .toString(),
                                                style: TextStyle(
                                                    color: messagesText,
                                                    fontSize: 14,
                                                    fontWeight:
                                                        FontWeight.w500)),
                                            if (jobInfomationController
                                                        .jobInfoModel
                                                        .value
                                                        .data!
                                                        .categories!
                                                        .length -
                                                    1 !=
                                                i)
                                              Text(', ',
                                                  style: TextStyle(
                                                      color: messagesText,
                                                      fontSize: 14,
                                                      fontWeight:
                                                          FontWeight.w500)),
                                          ],
                                        ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          );
                        }),
                      ],
                    ),
                  ),
          ),
        ),
      ),
    );
  }
}
