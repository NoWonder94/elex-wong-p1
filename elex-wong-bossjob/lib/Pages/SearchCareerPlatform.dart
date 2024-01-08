import 'package:bossjobapp/Constants/common.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/JobsController.dart';
import 'package:bossjobapp/Controllers/SearchJobController.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/Job.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SearchCareerPlatform extends StatefulWidget {
  const SearchCareerPlatform({Key? key}) : super(key: key);

  @override
  _SearchCareerPlatformState createState() => _SearchCareerPlatformState();
}

class _SearchCareerPlatformState extends State<SearchCareerPlatform> {
  SearchJobController searchJobController = Get.put(SearchJobController());
  JobsController jobsController = Get.put(JobsController());
  String title = Get.arguments;

  final ScrollController scrollController = ScrollController();
  int page = 1;

  @override
  void initState() {
    super.initState();
    scrollController.addListener(() {
      if (scrollController.position.pixels >=
              scrollController.position.maxScrollExtent &&
          searchJobController.isLoading.value == false &&
          page < searchJobController.totalPages.value) {
        searchJobController.searchJob(
          page: ++this.page,
        );
      }
    });
  }

  @override
  void dispose() {
    super.dispose();
    scrollController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: HeaderBar(isShowSearch: true, isShowClear: true, isClear: true),
      body: SingleChildScrollView(
        controller: scrollController,
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.all(20.0),
              alignment: Alignment.centerLeft,
              child: Text(
                title,
                style: styleJobTitle,
              ),
            ),
            Obx(() => Column(
                  children: [
                    searchJobController.searchJobList.length >= 1
                        ? ListView.separated(
                            physics: NeverScrollableScrollPhysics(),
                            shrinkWrap: true,
                            itemBuilder: (context, index) {
                              return Job(
                                title: searchJobController.searchJobList[index]
                                    ['job_title'],
                                price: formatJobPrice(
                                    searchJobController.searchJobList[index]
                                        ['salary_range_from'],
                                    searchJobController.searchJobList[index]
                                        ['salary_range_to']),
                                jobSkills: formatJobSkills(searchJobController
                                    .searchJobList[index]['job_skills']),
                                companyName: searchJobController
                                    .searchJobList[index]['company_name'],
                                jobs: searchJobController.searchJobList[index]
                                    ['job_location'],
                                year: searchJobController.searchJobList[index]
                                    ['xp_lvl'],
                                graduate: searchJobController
                                    .searchJobList[index]['degree'],
                                time: searchJobController.searchJobList[index]
                                    ['job_type'],
                                logo: searchJobController.searchJobList[index]
                                    ['company_logo'],
                                onPressed: () {
                                  Get.toNamed('/jobDetail', arguments: {
                                    'id': searchJobController
                                        .searchJobList[index]['id'],
                                    'title': searchJobController
                                        .searchJobList[index]['job_title'],
                                    'price': formatJobPrice(
                                        searchJobController.searchJobList[index]
                                            ['salary_range_from'],
                                        searchJobController.searchJobList[index]
                                            ['salary_range_to']),
                                    'jobSkills': formatJobSkills(
                                        searchJobController.searchJobList[index]
                                            ['job_skills']),
                                    'companyName': searchJobController
                                        .searchJobList[index]['company_name'],
                                    'location': searchJobController
                                        .searchJobList[index]['job_country'],
                                    'year': searchJobController
                                        .searchJobList[index]['xp_lvl'],
                                    'graduate': searchJobController
                                        .searchJobList[index]['degree'],
                                    'time': searchJobController
                                        .searchJobList[index]['job_type'],
                                    'logo': searchJobController
                                        .searchJobList[index]['company_logo'],
                                  });
                                },
                              );
                            },
                            separatorBuilder: (context, index) {
                              return Container();
                            },
                            itemCount: searchJobController.searchJobList.length)
                        : Container(
                            child: searchJobController.isLoading.value == true
                                ? Container()
                                : Column(
                                    children: [
                                      SizedBox(
                                        height: 10,
                                      ),
                                      Text(
                                          'No result for your search, try another location or job title'),
                                    ],
                                  ),
                          ),
                    searchJobController.isLoading.value == true
                        ? Container(
                            width: MediaQuery.of(context).size.width,
                            height: 50,
                            child: Center(
                              child: CircularProgressIndicator(),
                            ),
                          )
                        : Container()
                  ],
                ))
          ],
        ),
      ),
    );
  }
}
