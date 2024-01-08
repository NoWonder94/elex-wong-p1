import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/ApplyController.dart';
import 'package:bossjobapp/Controllers/JobDetails/JobInfomationController.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:bossjobapp/Widgets/FooterSubmitButton.dart';
import 'package:bossjobapp/Widgets/Job.dart';
import 'package:flutter/material.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:flutter_html/style.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';

class ApplyJobSimple extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new _ApplyJobSimpleState();
}

class _ApplyJobSimpleState extends State<ApplyJobSimple> {
  ApplyController applyController = Get.put(ApplyController());
  AppController appController = Get.put(AppController());
  JobInfomationController jobsInfoController = Get.find();

  @override
  Widget build(BuildContext context) {
    int jobId = Get.arguments['jobId'];
    String title = Get.arguments['title'];
    String price = Get.arguments['price'];
    List jobSkills = Get.arguments['jobSkills'];
    String companyName = Get.arguments['companyName'];
    String location = Get.arguments['location'];
    String graduate = Get.arguments['graduate'];
    String time = Get.arguments['time'];
    String year = Get.arguments['year'];

    TextEditingController messageController = new TextEditingController(
      text: 'Hi there, I am interested to apply for ' + title + '.',
    );
    applyController.setApplyMessage(messageController.text);

    return WillPopScope(
      onWillPop: () async => false,
      child: Scaffold(
        appBar: HeaderBar(
          isShowOnBack: true,
          onBackClick: () {
            if (applyController.isApplyApplicationLoading.value) {
              return;
            } else {
              Get.back();
            }
          },
        ),
        body: Container(
          color: background,
          child: Stack(
            children: [
              SingleChildScrollView(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(
                        height: 25,
                      ),
                      Job(
                          title: title,
                          price: price,
                          jobSkills: jobSkills,
                          companyName: companyName,
                          jobs: location,
                          graduate: graduate,
                          time: time,
                          year: year),
                      SizedBox(
                        height: 15,
                      ),
                      Container(
                        padding: EdgeInsets.only(
                          left: 20,
                          right: 20,
                          bottom: 0,
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Resume',
                              style: inputLabel,
                            ),
                            SizedBox(height: 10.0),
                            Obx(() {
                              if (applyController.loading.value)
                                return Container(
                                  child: Column(
                                    children: [
                                      SpinKitWave(
                                        color: primaryColor,
                                      ),
                                    ],
                                  ),
                                );
                              return InkWell(
                                onTap: () {
                                  applyController.updateResume();
                                },
                                child: Image.asset(uploadResume),
                              );
                            }),
                            SizedBox(height: 10.0),
                            Obx(() {
                              if (appController
                                      .userInfo.value.data!.latestResume ==
                                  null) return Container();
                              var displayName = '';
                              if (applyController.filename.value.isNotEmpty) {
                                displayName = applyController.filename.value;
                              } else if (appController.userInfo.value.data!
                                  .latestResume!.filename!.isNotEmpty) {
                                displayName = appController.userInfo.value.data!
                                    .latestResume!.filename!;
                              }
                              return Container(
                                width: double.infinity,
                                padding: EdgeInsets.symmetric(
                                    vertical: 10.0, horizontal: 10.0),
                                decoration: BoxDecoration(
                                  color: Color.fromARGB(255, 255, 255, 255),
                                  border: Border.all(
                                    color: searchBorder,
                                  ),
                                  borderRadius: BorderRadius.circular(5),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Flexible(
                                      child: Text(
                                        'Resume : ',
                                        style: TextStyle(
                                          color: primaryColor,
                                        ),
                                      ),
                                    ),
                                    Flexible(
                                      child: Text(
                                        displayName.toString(),
                                        style: TextStyle(
                                          color: primaryColor,
                                        ),
                                        overflow: TextOverflow.clip,
                                      ),
                                    ),
                                  ],
                                ),
                              );
                            }),
                          ],
                        ),
                      ),
                      SizedBox(height: 10.0),
                      Container(
                        padding: EdgeInsets.only(
                          left: 20,
                          right: 20,
                          bottom: 0,
                        ),
                        child: Column(
                          children: [
                            for (var i = 0;
                                i <
                                    jobsInfoController.jobInfoModel.value.data!
                                        .screeningQuestions!.length;
                                i++)
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    jobsInfoController.jobInfoModel.value.data!
                                        .screeningQuestions![i]!.question!
                                        .toString(),
                                    style: inputLabel,
                                  ),
                                  SizedBox(
                                    height: 10,
                                  ),
                                  Container(
                                    color: Colors.white,
                                    child: TextFormField(
                                        decoration: new InputDecoration(
                                          hintText:
                                              'Please answer the question.',
                                          fillColor: Colors.white,
                                          focusColor: Colors.white,
                                          border: OutlineInputBorder(
                                            borderSide: BorderSide(
                                                color: inactiveInputBorder),
                                            borderRadius:
                                                BorderRadius.circular(10),
                                          ),
                                        ),
                                        onChanged: (v) {
                                          applyController.setQuestionAnwser(
                                              v, i);
                                        },
                                        style: inputText,
                                        keyboardType: TextInputType.multiline,
                                        maxLines: 6),
                                  ),
                                ],
                              )
                          ],
                        ),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      if (jobsInfoController.jobInfoModel.value.data!
                              .screeningQuestions!.length ==
                          0)
                        Container(
                          padding: EdgeInsets.only(
                            left: 20,
                            right: 20,
                            bottom: 0,
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Message',
                                style: inputLabel,
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              Container(
                                color: Colors.white,
                                child: TextFormField(
                                    decoration: new InputDecoration(
                                      hintText:
                                          'Hi there, I am interested to apply for ' +
                                              title +
                                              '.',
                                      fillColor: Colors.white,
                                      focusColor: Colors.white,
                                      border: OutlineInputBorder(
                                        borderSide: BorderSide(
                                            color: inactiveInputBorder),
                                        borderRadius: BorderRadius.circular(10),
                                      ),
                                    ),
                                    onChanged: (v) {
                                      applyController.setApplyMessage(v);
                                    },
                                    style: inputText,
                                    keyboardType: TextInputType.multiline,
                                    maxLines: 6),
                              ),
                            ],
                          ),
                        ),
                      SizedBox(height: 150.0),
                    ]),
              ),
              Align(
                alignment: Alignment.bottomCenter,
                child: Container(
                  child: FooterSubmitButton(
                    label: 'Submit',
                    onPressed: () {
                      applyController.submitJobApplication(
                          jobId, location, time);
                    },
                  ),
                ),
              ),
              Obx(() {
                if (applyController.isApplyApplicationLoading.value)
                  return Positioned(
                      child: Container(
                    color: Colors.white.withOpacity(0.5),
                    height: h(context, 0.9),
                    width: w(context, 1),
                    child: Center(
                        child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        SpinKitDualRing(color: primaryColor),
                        SizedBox(
                          height: 20,
                        ),
                        Text('Loading',
                            style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: secondaryColor)),
                        SizedBox(
                          height: 20,
                        ),
                      ],
                    )),
                  ));
                return Container();
              })
            ],
          ),
        ),
      ),
    );
  }
}
