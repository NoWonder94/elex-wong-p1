import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:bossjobapp/Widgets/Search.dart';
import 'package:bossjobapp/Widgets/Jobs/CareerPlatform.dart';
import 'package:bossjobapp/Widgets/Jobs/TopCompanies.dart';
import 'package:bossjobapp/Widgets/Jobs/FeaturedJobs.dart';
import 'package:bossjobapp/Controllers/JobsController.dart';

class Jobs extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new _JobsState();
}

class _JobsState extends State<Jobs> {
  JobsController jobsController = Get.put(JobsController());
  AppController appController = Get.put(AppController());

  final ScrollController scrollController = ScrollController();
  int page = 1;

  @override
  void initState() {
    jobsController.getJobList(
      page: this.page,
    );
    scrollController.addListener(() {
      if (scrollController.position.pixels >=
              scrollController.position.maxScrollExtent &&
          jobsController.isJobListLoading.value == false) {
        jobsController.getJobList(
          page: ++this.page,
        );
      }
    });
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
    scrollController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      controller: scrollController,
      child: Container(
        child: Column(
          children: [
            Obx(() {
              if (appController.userInfo.value.data == null) return Search();
              return Search(
                slogan: 'Hi, ${appController.userInfo.value.data!.firstName!}',
              );
            }),
            CareerPlatform(),
            TopCompanies(),
            FeaturedJobs(),
          ],
        ),
      ),
    );
  }
}
