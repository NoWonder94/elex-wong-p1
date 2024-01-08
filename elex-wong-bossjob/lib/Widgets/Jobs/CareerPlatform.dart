import 'package:bossjobapp/Constants/constant.dart';
import 'package:bossjobapp/Controllers/SearchJobController.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/JobsController.dart';

class PlatformList {
  String type;
  String title;
  List<String> list;

  PlatformList({required this.type, required this.title, required this.list});
}

class CareerPlatform extends StatelessWidget {
  CareerPlatform({Key? key}) : super(key: key);
  final JobsController jobsController = Get.put(JobsController());
  final SearchJobController searchJobController =
      Get.put(SearchJobController());

  final List<PlatformList> list = <PlatformList>[
    PlatformList(type: 'specialization', title: 'Finance Jobs', list: [
      'audit-taxation',
      'banking-financial',
      'corporate-finance-investment',
      'sales-financial-services',
      'general-cost-accounting'
    ]),
    PlatformList(type: 'specialization', title: 'Sales Jobs', list: [
      'sales-corporate',
      'sales-eng-tech-it',
      'sales-financial-services',
      'marketing-business-dev'
    ]),
    PlatformList(type: 'specialization', title: 'Marketing Jobs', list: [
      'digital-marketing',
      'marketing-business-dev',
      'telesales-telemarketing'
    ]),
    PlatformList(type: 'location', title: 'Makati Jobs', list: ['Makati']),
    PlatformList(type: 'specialization', title: 'IT Jobs', list: [
      'it-hardware',
      'it-network-sys-db-admin',
      'it-software-engineering',
      'sales-eng-tech-it',
      'tech-helpdesk-support'
    ]),
    PlatformList(type: 'location', title: 'Overseas Jobs', list: ['Overseas']),
    PlatformList(
        type: 'specialization',
        title: 'Customer Service',
        list: ['customer-service', 'tech-helpdesk-support']),
    PlatformList(
        type: 'salary',
        title: '₱30K+ Jobs',
        list: ['30K_to_60K', '60K_to_80K', '80K_to_100K', 'Above_200K']),
    PlatformList(type: 'location', title: 'Manila Jobs', list: ['Manila']),
    PlatformList(type: 'jobtype', title: 'Full Time Jobs', list: ['full_time']),
  ];

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
                'Career Platform',
                style: styleJobTitle,
              ),
            ],
          ),
          SizedBox(
            height: 10,
          ),
          Align(
            alignment: Alignment.center,
            child: Wrap(
              alignment: WrapAlignment.spaceBetween,
              children: list
                  .map(
                    (item) => Container(
                      padding: EdgeInsets.only(right: 6.0),
                      child: SizedBox(
                        width: w(context, 0.28),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            padding: EdgeInsets.zero,
                            primary: Colors.white,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(6),
                            ),
                          ),
                          child: Text(
                            item.title,
                            style: styleJobText,
                            textAlign: TextAlign.center,
                          ),
                          onPressed: () {
                            searchJobController.clearInput();
                            switch (item.type) {
                              case 'specialization':
                                for (var i = 0; i < item.list.length; i++)
                                  searchJobController.selectedSpecialization
                                      .add(item.list[i]);
                                break;
                              case 'location':
                                searchJobController.selectedLocation
                                    .add(item.list[0]);
                                break;
                              case 'salary':
                                searchJobController.salaryRange.value =
                                    RangeValues(30000.0, rangebarMax);
                                break;
                              case 'jobtype':
                                searchJobController.selectedType
                                    .add(item.list[0]);
                                break;
                            }
                            AnalyticsService()
                                .clickQuickLink("Career Platform");
                            Get.toNamed('/searchCareer', arguments: item.title);
                            searchJobController.searchJob();
                          },
                        ),
                      ),
                    ),
                  )
                  .toList(),
            ),
          ),
        ],
      ),
    );
  }
}
