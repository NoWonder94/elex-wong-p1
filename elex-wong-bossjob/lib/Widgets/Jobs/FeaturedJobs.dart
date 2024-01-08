import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:bossjobapp/Constants/common.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Widgets/Job.dart';
import 'package:bossjobapp/Controllers/JobsController.dart';

class FeaturedJobs extends StatefulWidget {
  @override
  _FeaturedJobsState createState() => _FeaturedJobsState();
}

class _FeaturedJobsState extends State<FeaturedJobs> {
  JobsController jobsController = Get.put(JobsController());
  @override
  Widget build(BuildContext context) {
    return Container(
        padding: EdgeInsets.only(
          top: 25,
          left: 0,
          right: 0,
          bottom: 0,
        ),
        child: Obx(
          () => Column(
            children: [
              Row(
                children: [
                  SizedBox(
                    width: 20,
                  ),
                  Text(
                    'Featured Jobs',
                    style: styleJobTitle,
                  ),
                ],
              ),
              SizedBox(
                height: 10,
              ),
              ListView.separated(
                physics: NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                itemBuilder: (context, index) {
                  return Job(
                    title: jobsController.jobList[index]['job_title'],
                    price: formatJobPrice(
                        jobsController.jobList[index]['salary_range_from'],
                        jobsController.jobList[index]['salary_range_to']),
                    jobSkills: formatJobSkills(
                        jobsController.jobList[index]['job_skills']),
                    companyName: jobsController.jobList[index]['company_name'],
                    jobs: jobsController.jobList[index]['job_location'],
                    year: jobsController.jobList[index]['xp_lvl'],
                    graduate: jobsController.jobList[index]['degree'],
                    time: jobsController.jobList[index]['job_type'],
                    logo: jobsController.jobList[index]['company_logo'],
                    onPressed: () {
                      AnalyticsService().clickQuickLink("Featured Jobs");
                      Get.toNamed('/jobDetail', arguments: {
                        'id': jobsController.jobList[index]['id'].toInt(),
                        'title': jobsController.jobList[index]['job_title'],
                        'price': formatJobPrice(
                            jobsController.jobList[index]['salary_range_from'],
                            jobsController.jobList[index]['salary_range_to']),
                        'jobSkills': formatJobSkills(
                            jobsController.jobList[index]['job_skills']),
                        'companyName': jobsController.jobList[index]
                            ['company_name'],
                        'location': jobsController.jobList[index]
                            ['job_location'],
                        'year': jobsController.jobList[index]['xp_lvl'],
                        'graduate': jobsController.jobList[index]['degree'],
                        'time': jobsController.jobList[index]['job_type'],
                        'logo': jobsController.jobList[index]['company_logo'],
                      });
                    },
                  );
                },
                separatorBuilder: (context, index) {
                  return Container();
                },
                itemCount: jobsController.jobList.length,
              ),
              if (jobsController.isJobListLoading.value == true)
                Container(
                  width: MediaQuery.of(context).size.width,
                  height: 50,
                  child: Center(
                    child: CircularProgressIndicator(),
                  ),
                ),
            ],
          ),
        ));
  }
}
