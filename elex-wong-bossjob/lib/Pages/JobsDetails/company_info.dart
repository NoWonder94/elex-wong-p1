import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/common.dart';
import 'package:bossjobapp/Controllers/JobDetails/CompanyInfomationController.dart';
import 'package:bossjobapp/Widgets/BorderText.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/Job.dart';
import 'package:bossjobapp/Widgets/SemiJob.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';

class CompanyInfomation extends StatelessWidget {
  const CompanyInfomation({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    CompanyInfomationController companyInfomationController =
        Get.put(CompanyInfomationController());
    var title = Get.arguments['title'];
    var price = Get.arguments['price'];
    var jobSkills = Get.arguments['jobSkills'];
    var companyName = Get.arguments['companyName'];
    var jobs = Get.arguments['jobs'];
    var year = Get.arguments['year'];
    var graduate = Get.arguments['graduate'];
    var time = Get.arguments['time'];
    var logo = Get.arguments['logo'];
    var isShowJob = Get.arguments['is_show_job'] == null ? true : false;

    return Scaffold(
      appBar: HeaderBar(isShowOnBack: true),
      body: Container(
        color: background,
        child: Obx(
          () => Container(
            child: companyInfomationController.isJobCompanyLoading.value == true
                ? Center(
                    child: CircularProgressIndicator(),
                  )
                : SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 25),
                        //Job Widget
                        isShowJob
                            ? Job(
                                title: title ?? '',
                                price: price,
                                jobSkills: jobSkills,
                                companyName: companyName,
                                jobs: jobs,
                                year: year,
                                graduate: graduate,
                                time: time,
                                logo: logo)
                            : Container(),
                        //Company Description
                        Obx(() {
                          if (companyInfomationController.companyModel.value
                              .data!.descriptionHtml!.isEmpty) {
                            return SizedBox(
                              height: 1,
                            );
                          }
                          return Container(
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Company Description",
                                      style: TextStyle(
                                          color: primaryColor,
                                          fontSize: 14,
                                          fontWeight: FontWeight.w500)),
                                  SizedBox(
                                    height: 10,
                                  ),
                                  Html(
                                    data: filterHtml(
                                      companyInfomationController.companyModel
                                          .value.data!.descriptionHtml
                                          .toString(),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          );
                        }),

                        // //Company Culture
                        Obx(() {
                          if (companyInfomationController
                                  .companyModel.value.data!.cultures!.length <
                              1) {
                            return SizedBox(height: 1);
                          }
                          return Container(
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Company Culture",
                                      style: TextStyle(
                                          color: primaryColor,
                                          fontSize: 14,
                                          fontWeight: FontWeight.w500)),
                                  SizedBox(
                                    height: 15,
                                  ),
                                  Wrap(
                                    children: [
                                      for (var i = 0;
                                          i <
                                              companyInfomationController
                                                  .companyModel
                                                  .value
                                                  .data!
                                                  .cultures!
                                                  .length;
                                          i++)
                                        BorderText(
                                            label: companyInfomationController
                                                .companyModel
                                                .value
                                                .data!
                                                .cultures![i]!
                                                .value!
                                                .toString()),
                                    ],
                                  )
                                ],
                              ),
                            ),
                          );
                        }),

                        //Company Benefits

                        Obx(() {
                          if (companyInfomationController
                              .companyModel.value.data!.benefits!.isEmpty) {
                            return SizedBox(height: 1);
                          }
                          return Container(
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Company Benefits",
                                      style: TextStyle(
                                          color: primaryColor,
                                          fontSize: 14,
                                          fontWeight: FontWeight.w500)),
                                  SizedBox(
                                    height: 15,
                                  ),
                                  Wrap(
                                    children: [
                                      for (var i = 0;
                                          i <
                                              companyInfomationController
                                                  .companyModel
                                                  .value
                                                  .data!
                                                  .benefits!
                                                  .length;
                                          i++)
                                        BorderText(
                                            label: companyInfomationController
                                                .companyModel
                                                .value
                                                .data!
                                                .benefits![i]!
                                                .value!
                                                .toString()),
                                    ],
                                  )
                                ],
                              ),
                            ),
                          );
                        }),

                        //Company Photos

                        Obx(() {
                          if (companyInfomationController
                              .companyModel.value.data!.pictures!.isEmpty) {
                            return SizedBox(height: 1);
                          }
                          return Container(
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Company Photos",
                                      style: TextStyle(
                                          color: primaryColor,
                                          fontSize: 14,
                                          fontWeight: FontWeight.w500)),
                                  SizedBox(
                                    height: 15,
                                  ),
                                  Wrap(
                                    children: [
                                      for (var i = 0;
                                          i <
                                              companyInfomationController
                                                  .companyModel
                                                  .value
                                                  .data!
                                                  .pictures!
                                                  .length;
                                          i++)
                                        Container(
                                          child: Padding(
                                            padding: EdgeInsets.all(8.0),
                                            child: Image.network(
                                                companyInfomationController
                                                    .companyModel
                                                    .value
                                                    .data!
                                                    .pictures![i]!
                                                    .url!
                                                    .toString(),
                                                height: 100,
                                                fit: BoxFit.fill),
                                          ),
                                        )
                                    ],
                                  )
                                ],
                              ),
                            ),
                          );
                        }),
                        //others joblist
                        Obx(
                          () {
                            if (companyInfomationController
                                    .isCompanyOthersJobLoading.value ==
                                true)
                              return SpinKitCircle(
                                color: Colors.grey,
                              );

                            if (companyInfomationController
                                    .companyJobModel.value.data!.isEmpty ==
                                true) return Container();

                            return Container(
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                        "Jobs at " +
                                            companyInfomationController
                                                .companyModel.value.data!.name
                                                .toString() +
                                            "(" +
                                            companyInfomationController
                                                .companyJobModel
                                                .value
                                                .data!
                                                .totalNum
                                                .toString() +
                                            ")",
                                        style: TextStyle(
                                            color: titleText,
                                            fontSize: 14,
                                            fontWeight: FontWeight.w500)),
                                    SizedBox(
                                      height: 15,
                                    ),
                                    Container(
                                      height: 200,
                                      child: ListView(
                                        scrollDirection: Axis.horizontal,
                                        controller: companyInfomationController
                                            .scrollController,
                                        children: [
                                          for (var i = 0;
                                              i <
                                                  companyInfomationController
                                                      .jobCompanyJobsList
                                                      .length;
                                              i++)
                                            Container(
                                              width: 270, //w(context,70)
                                              child: Padding(
                                                padding: EdgeInsets.all(8.0),
                                                child: SemiJob(
                                                  degree:
                                                      companyInfomationController
                                                              .jobCompanyJobsList[
                                                          i]['degree'],
                                                  expLvl:
                                                      companyInfomationController
                                                              .jobCompanyJobsList[
                                                          i]['xp_lvl'],
                                                  jobLocation:
                                                      companyInfomationController
                                                              .jobCompanyJobsList[
                                                          i]['job_location'],
                                                  jobTitle:
                                                      companyInfomationController
                                                              .jobCompanyJobsList[
                                                          i]['job_title'],
                                                  jobType:
                                                      companyInfomationController
                                                              .jobCompanyJobsList[
                                                          i]['job_type'],
                                                  price: formatJobPrice(
                                                      companyInfomationController
                                                              .jobCompanyJobsList[i]
                                                          ['salary_range_from'],
                                                      companyInfomationController
                                                              .jobCompanyJobsList[
                                                          i]['salary_range_to']),
                                                  onPressed: () {
                                                    Get.toNamed('/jobDetail',
                                                        arguments: {
                                                          'id': companyInfomationController
                                                              .jobCompanyJobsList[
                                                                  i]['id']
                                                              .toInt(),
                                                          'title': companyInfomationController
                                                                  .jobCompanyJobsList[
                                                              i]['job_title'],
                                                          'price': formatJobPrice(
                                                              companyInfomationController
                                                                      .jobCompanyJobsList[i]
                                                                  [
                                                                  'salary_range_from'],
                                                              companyInfomationController
                                                                      .jobCompanyJobsList[i]
                                                                  [
                                                                  'salary_range_to']),
                                                          'jobSkills': const [],
                                                          'companyName':
                                                              companyInfomationController
                                                                  .companyModel
                                                                  .value
                                                                  .data!
                                                                  .name
                                                                  .toString(),
                                                          'location':
                                                              companyInfomationController
                                                                      .jobCompanyJobsList[i]
                                                                  [
                                                                  'job_location'],
                                                          'year': companyInfomationController
                                                                  .jobCompanyJobsList[
                                                              i]['xp_lvl'],
                                                          'graduate':
                                                              companyInfomationController
                                                                      .jobCompanyJobsList[
                                                                  i]['degree'],
                                                          'time': companyInfomationController
                                                                  .jobCompanyJobsList[
                                                              i]['job_type'],
                                                          'logo':
                                                              companyInfomationController
                                                                  .companyModel
                                                                  .value
                                                                  .data!
                                                                  .logo
                                                                  .toString(),
                                                        });
                                                  },
                                                ),
                                              ),
                                            )
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                      ],
                    ),
                  ),
          ),
        ),
      ),
    );
  }
}
