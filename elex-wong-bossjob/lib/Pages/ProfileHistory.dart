import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/common.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/ProfileHistoryController.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';

class ProfileHistory extends StatefulWidget {
  @override
  State<ProfileHistory> createState() => _ProfileHistoryState();
}

class _ProfileHistoryState extends State<ProfileHistory> {
  ProfileHistoryController profileHistoryController =
      Get.put(ProfileHistoryController());

  final ScrollController scrollController = ScrollController();
  int page = 1;

  @override
  void initState() {
    super.initState();

    scrollController.addListener(() {
      if (scrollController.position.pixels >=
          scrollController.position.maxScrollExtent) {
        profileHistoryController.getAppliedJobs(
          ++this.page,
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
      appBar: HeaderBar(
        isShowOnBack: true,
      ),
      body: Container(
        color: Colors.white,
        padding: EdgeInsets.only(
          left: 20.0,
          right: 20.0,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: SingleChildScrollView(
                controller: scrollController,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(height: 20.0),
                    Text(
                      'Applied Jobs',
                      style: styleJobTitle,
                    ),
                    SizedBox(height: 25.0),
                    Obx(
                      () {
                        if (profileHistoryController.isAppliedListLoading.value)
                          return SpinKitCircle(
                            color: Colors.grey,
                          );

                        if (profileHistoryController.appliedJobsList.length < 1)
                          return Container(
                            width: double.infinity,
                            child: Text('Haven\'t applied any job.'),
                          );

                        return Column(
                          children: profileHistoryController.appliedJobsList
                              .map(
                                (appliedJob) => Container(
                                  padding: EdgeInsets.symmetric(horizontal: 13),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      /* job title & salary */

                                      Row(
                                        children: [
                                          Expanded(
                                            flex: 3,
                                            child: Text(
                                              appliedJob['job']['job_title']
                                                  .toString(),
                                              style: styleJobListTitleText,
                                            ),
                                          ),
                                          Flexible(
                                            fit: FlexFit.tight,
                                            child: SizedBox(),
                                          ),
                                          Text(
                                            formatJobPrice(
                                                appliedJob['job']
                                                    ['salary_range_from'],
                                                appliedJob['job']
                                                    ['salary_range_to']),
                                            style: styleJobListPriceText,
                                          ),
                                        ],
                                      ),
                                      SizedBox(height: 7),
                                      /* Job skills */
                                      Wrap(
                                        children: formatJobSkills(
                                                appliedJob['job']['job_skills'])
                                            .map(
                                              (jobSkill) => Container(
                                                margin: EdgeInsets.only(
                                                    right: 5, bottom: 5),
                                                padding: EdgeInsets.all(3.0),
                                                decoration: BoxDecoration(
                                                  border: Border.all(
                                                      color:
                                                          jobListCategoryBorder),
                                                  borderRadius:
                                                      BorderRadius.circular(5),
                                                ),
                                                child: Text(
                                                  jobSkill.toString(),
                                                  style:
                                                      styleJobListCategoryText,
                                                ),
                                              ),
                                            )
                                            .toList(),
                                      ),
                                      SizedBox(height: 4),
                                      /* company name */
                                      Row(
                                        children: [
                                          appliedJob['company']['logo'] != ''
                                              ? Flexible(
                                                  child: Image.network(
                                                      appliedJob['company']
                                                          ['logo'],
                                                      height: 50,
                                                      fit: BoxFit.fill),
                                                )
                                              : Container(),
                                          appliedJob['company']['logo'] != ''
                                              ? SizedBox(
                                                  width: 15,
                                                )
                                              : Container(),
                                          Flexible(
                                            child: Text(
                                              appliedJob['company']['name'],
                                              style: styleJobListCompanyText,
                                            ),
                                          ),
                                        ],
                                      ),

                                      SizedBox(height: 10),
                                      // job status
                                      Container(
                                        padding: EdgeInsets.symmetric(
                                            horizontal: 20.0, vertical: 3.0),
                                        decoration: BoxDecoration(
                                          color: getStatusContainerColor(
                                              appliedJob['status_id']),
                                          borderRadius:
                                              BorderRadius.circular(10.0),
                                          border: Border.all(
                                            color: searchBorder,
                                          ),
                                        ),
                                        child: Text(
                                          appliedJob['status_value'],
                                          style: TextStyle(
                                            color: getStatusFontColor(
                                                appliedJob['status_id']),
                                            fontSize: 13.0,
                                          ),
                                        ),
                                      ),
                                      SizedBox(height: 10),
                                      /* last row */
                                      Wrap(
                                        children: [
                                          Wrap(
                                            children: [
                                              Image.asset(
                                                imgJobs,
                                                scale: 1.6,
                                              ),
                                              SizedBox(width: 5),
                                              Text(
                                                appliedJob['job']
                                                        ['job_location']
                                                    .toString(),
                                                style: styleJobListIconText,
                                              ),
                                              SizedBox(width: 10),
                                            ],
                                          ),
                                          Wrap(
                                            children: [
                                              Image.asset(
                                                imgTime,
                                                scale: 1.6,
                                              ),
                                              SizedBox(width: 5),
                                              Text(
                                                appliedJob['job']['xp_lvl'],
                                                style: styleJobListIconText,
                                              ),
                                              SizedBox(width: 10),
                                            ],
                                          ),
                                          Wrap(
                                            children: [
                                              Image.asset(
                                                imgGraduate,
                                                scale: 1.6,
                                              ),
                                              SizedBox(width: 5),
                                              Text(
                                                appliedJob['job']['degree'],
                                                style: styleJobListIconText,
                                              ),
                                              SizedBox(width: 10),
                                            ],
                                          ),
                                          Wrap(
                                            children: [
                                              Image.asset(
                                                imgLocation,
                                                scale: 1.6,
                                              ),
                                              SizedBox(width: 5),
                                              Text(
                                                appliedJob['job']['job_type'],
                                                style: styleJobListIconText,
                                              ),
                                              SizedBox(width: 10),
                                            ],
                                          ),
                                        ],
                                      ),
                                      SizedBox(height: 50),
                                    ],
                                  ),
                                ),
                              )
                              .toList(),
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
