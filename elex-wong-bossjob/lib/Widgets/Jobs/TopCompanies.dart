import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/JobsController.dart';

class TopCompanies extends StatelessWidget {
  TopCompanies({Key? key}) : super(key: key);
  final JobsController jobsController = Get.put(JobsController());

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(
        top: 25,
        left: 20,
        right: 20,
        bottom: 0,
      ),
      child: Column(
        children: [
          Row(
            children: [
              Text(
                'Top Companies',
                style: styleJobTitle,
              ),
            ],
          ),
          SizedBox(
            height: 10,
          ),
          Obx(
            () => Container(
              height: 70,
              child: jobsController.isTopCompanyListLoading.value == true
                  ? Center(
                      child: CircularProgressIndicator(),
                    )
                  : ListView(
                      scrollDirection: Axis.horizontal,
                      children: [
                        for (var i = 0;
                            i < jobsController.topCompanyList.length;
                            i++)
                          Row(
                            children: [
                              ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  padding: EdgeInsets.all(0.0),
                                  primary: Colors.white,
                                ),
                                child: Image.network(
                                  jobsController.topCompanyList[i]['logo'],
                                ),
                                onPressed: () {
                                  AnalyticsService()
                                      .clickQuickLink("Top Companies");
                                  AnalyticsService().clickTopCom(
                                      jobsController.topCompanyList[i]['id']);

                                  Get.toNamed('/companyDetail', arguments: {
                                    'companyID':
                                        jobsController.topCompanyList[i]['id'],
                                    'is_show_job': false,
                                  });
                                },
                              ),
                              SizedBox(
                                width: 10,
                              ),
                            ],
                          ),
                      ],
                    ),
            ),
          ),
        ],
      ),
    );
  }
}
